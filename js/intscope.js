//object containing attributes and methods to calculate colonoscopy interval
//and need for site check  based on recoomendations from the 2019 guidelines.
//Takes data from patient object created in index.js- adds extra fields to this object.

const intScope=
{   msec_year:31536000000,
    msec_three_years:94608000000,

    polyp_guide:   //data for polyp method
        {
        young: 50,    //10 years below BCSP age
        old: 75,    //max rec. age for screening
        int: 3,    // rec. years for survaillance
        young_low_risk_int: 5 //surv. interval for low risk patients below BCSP age
        },

    crc_guide://data for crc method
        {
        firsst_crc_int: 1,  //years from resection to first surveillance
        second_crc_int: 3, //  years from resection to second surveillance
        },

       


    calculate_interval(patient)
    //master method to call the methods needed 
   
        { console.log(patient)
        if (patient.num_polyps || patient.mult_polyp_question)  //polyps reported in first level questions.
            {
            patient=this.polyp(patient)
            }

        if (patient.prev_crc)//hist of crc reported in first level questions
            {
            patient=this.crc(patient)
            }
        

        if (patient.genetic)
            {
            console.log("genetic called")
            patient=this.genetic(patient)
            console.log(patient.genetic_interval)
            }
        patient.final_int = Math.min(patient.polyp_int, patient.crc_interval,patient.genetic_interval);
        if (patient.age+patient.final_int>patient.old)//prevents surveillance examination over recommended sureillance age
            {
            patient.final_int=100
            }
            
        console.log(patient.final_int);
        return(patient)    
        },
        
    polyp(patient) 
    //calculates surveillance interval and need for site check based on polyps on recent examinations
    
    {
        if (patient.age<=this.polyp_guide.old-this.polyp_guide.int)   
            {
            //check if MCRAs criterio satisfied soley on this exam (in case checking button missed)
            if (patient.num_polyps>20 || (patient.age<60 && patient.num_polyps>10))
                {
                patient.mult_polyp_question=true;
                }
            //determine if advanced polyp present
            this.advanced_polyp=false; 
            if (patient.size_polyp>=10 || patient.serr_dysplasia || patient.hgd)
                {
                this.advanced_polyp=true;
                }

            //determine interval
            //2 or more polyps inc advanced polyps or 5 or more polyps - inteval set in polyp_guide
            if ( (this.advanced_polyp && patient.num_polyps>1) || (patient.num_polyps>4) )
                {
                patient.polyp_int=this.polyp_guide.int;
                console.log(patient.polyp_int)
                }
            //surveillance for young patients not meeting above criteria (age and interval set in polyp_guide)   
            else if (patient.age<=this.polyp_guide.young)
                {
                patient.polyp_int=this.polyp_guide.young_low_risk_int;
                }
            
             else
                {
                patient.polyp_int=100; //arbitatry high interval;
                }
            }

        if (patient.mult_polyp_question)
            {console.log("multiple polyps reached")

            if (patient.scopedate===null)
                {
                 patient.polyp_int=0  
                }

            else if (patient.num_polyps>0 && (patient.age<=this.polyp_guide.old-1))//bug here- this is evaluating true with 0 polyps
                {
                patient.polyp_int=Math.min(1,patient.polyp_int)
                }

            else if ((patient.num_polyps===0) && (patient.age<=this.polyp_guide.old-2))
                {
                patient.polyp_int=Math.min(2, patient.polyp_int)

                console.log(patient.polyp_int)
                }

        }
        // determine if site check needed for large lnpcp or piecemeal polypectomy
        if (patient.lnpcp  || patient.over_ten_mm_piecemeal || patient.hgd_piecemeal || patient.serr_dysplasia_piecemeal )
            {
            patient.site_check=true;
            if (patient.lnpcp)
                {
                patient.second_site_check=true
                }
            }
          
         
        console.log(`polyp interval${patient.polyp_int}`)
         return(patient)   
    },


    crc(patient)
    //calculate inteval based on previous CRC
    {console.log("crc-function")
    if  (!!patient.scopedate)
        {
        crc_surv_interval=patient.scopedate - patient.crc_resected
        if (crc_surv_interval <= 0)//last colonoscopy before cancer resection
            {console.log("scope bfore resection")
            console.log(patient.crc_resected/this.msec_year, patient.date_now/this.msec_year)
            patient.crc_interval=patient.crc_resected + this.msec_year-patient.date_now
            }
        else if (crc_surv_interval < this.msec_three_years)//last colonoscopy not more than 3 years since resection
            {console.log("scope <3 years from resection")
            patient.crc_interval=patient.scopedate + this.msec_three_years - patient.date
            }
        
            console.log("scope 3 years after resect")
        }
    else
        {
        if (!patient.firt_surv_done)
            {
            patient.crc_interval=patient.crc_resected + this.msec_year-patient.date_now
            }
        else if (patient.firt_surv_done && !patient.second_surv)
            {
            patient.crc_interval=patient.date_first_CRC_surveillance + this.msec_three_years - patient.date
            }
        }
    if (patient.crc_interval===null) 
        {
        patient.crc_interval=100
        }
    return patient;
    },


    //calculate interval based on genetic and family history risk if genetic/fh questions answered
    genetic(patient)
  
    {
    patient.genetic_interval=100
    if (patient.sps)
        {
        if (!patient.sps_colon_cleared)
            {
            patient.genetic_interval=0
            return patient//no shorter subsequent intervals since colon cleared implies full colonoscopy done
            }
        else if (patient.sps_large_polyps)
            {
            patient.genetic_interval=1
            }
        else
            {
            patient.genetic_interval=2
            }
        }

        if (patient.fap)
            {
            if (patient.age > 12)
                {
                patient.genetic_interval=Math.min(patient.genetic_interval,1)
                }
            else
                {
                    let provisional_interval=12-patient.age
                    if((patient.date_now-patient.scopedate<this.msec_year) && provisional_interval < 1)//if colonoscopy due in <1 year alters to one year if colonoscopy withnin last year
                        {
                        provisional_interval=1
                        }
                    patient.genetic_interval=Math.min(patient.genetic_interval, provisional_interval)
                }    
            }  
                
        if (patient.mutyh)
        {
        if (patient.age > 18)
            {
            patient.genetic_interval=Math.min(patient.genetic_interval,1)
            }
        else
        {
            let provisional_interval=18-patient.age
            if((patient.date_now-patient.scopedate<this.msec_year) && provisional_interval < 1)//if colonoscopy due in <1 year alters to one year if colonoscopy withnin last year
                {
                provisional_interval=1
                }
            patient.genetic_interval=Math.min(patient.genetic_interval, provisional_interval)
        }    
        } 

        if (patient.jps)
        {
        if (patient.age >= 15)
            {
            if (patient.scopedate === null)
                {
                patient.genetic_interval=0
                return patient
                }
            else
                {
                patient.genetic_interval=Math.min(2,patient.genetic_interval)
                }
            }
        
        else
            {
                let provisional_interval=15-patient.age
                if((patient.date_now-patient.scopedate<this.msec_year) && provisional_interval < 1)//if colonoscopy due in <1 year alters to one year if colonoscopy withnin last year
                    {
                    provisional_interval=1
                    }
                patient.genetic_interval=Math.min(patient.genetic_interval, provisional_interval)
            }
      
        
         return patient
           
        } 

    if (patient.pjs) 
        {
        if (patient.age<8)
            {
            let provisional_interval=8-patient.age
            if((patient.date_now-patient.scopedate<this.msec_year) && provisional_interval < 1)//if colonoscopy due in <1 year alters to one year if colonoscopy withnin last year
                {
                provisional_interval=1
                }
            patient.genetic_interval=Math.min(patient.genetic_interval, provisional_interval)
            }
        else if(patient.age<18)
            {
            if (patient.scopedate=null)
                {
                patient.genetic_interval=0
                return patient   
                }
            else if (patient.pjs_prev_polyps)
                {
                patient.genetic_interval=Math.min(patient.genetic_interval,3)
                }
            else
                {
                let provisional_interval=18-patient.age
                if((patient.date_now-patient.scopedate<this.msec_year) && provisional_interval < 3)//if colonoscopy due in <3 year alters to three years if colonoscopy withnin last year
                    {
                    provisional_interval=3
                    console.log(adjusted)
                    }
                patient.genetic_interval=Math.min(patient.genetic_interval, provisional_interval)   
                }
            }
        else
            {
            if (patient.scopedate=null)//colonoscopy due now if no previous colonoscopy
                {
                patient.genetic_interval=0
                return patient
                }
            else
                {
                patient.genetic_interval=Math.min(patient.genetic_interval,3)
                }
            }
        }       

        if (patient.fh_crc)
            {
            //high risk amsterdam criteria patient- if not proven lynch recommendation is genetic testing - if genetic testing not possible considet survaillance as per lynch
            if (patient.numb_fdr==="3")
                {
                 if (patient.fdr_multi_gen && patient.fdr_under_50 && !patient.lynch)
                    {
                     if (confirm("Potential Lynch Family \n If genetic testing has not been carried out, the pateint should be refered for this.  If genetic testing is not possible consider surveillance as Lynch syndrome. CLick OK to treat as presumed Lynch syndrome or cancel "))
                        {
                         patient.lynch=true
                        }
                    }
                 if (patient.age>=40)
                    {
                    if (patient.scopedate===null)
                        {
                        patient.genetic_interval=0
                        return patient   
                        }
                    else
                        {
                        patient.genetic_interval=Math.min(5, patient.genetic_interval)
                        }                   
                    }  
                }
            else if ((patient.numb_fdr==="2") || (patient.numb_fdr==="1" && patient.fdr_under_50))// two first degree relative or one first degree relative under 55
                {
                   console.log(patient.age)
                if (patient.age>=55)
                    {
                        //never had a scope or not had a scope since 55 or inthe last 3 years
                    if (patient.scopedate===null || (patient.date-now-patient.scopedate)/this.msec_year>3  && patient.age - ((patient.date_now-patient.scopedate)/this.msec_year)>55)
                        {
                        patient.genetic_interval=0
                        return patient
                        }
                    
                    else 
                        {
                        patient.genetic_interval=Math.min(patient.genetic_interval,100)
                        }
                    }   
                else // patient under 55
                    {
                    patient.genetic_interval=Math.min(patient.genetic_interval, (55-patient.age))
                    } 
                }
            else //low risk group
                {
                patient.genetic_interval=Math.min(patient.genetic_interval, 100)
                }
            
            }

        if (patient.lynch)
            {
            if (patient.scopedate===null && (patient.age>=35 || (patient.age>=25 && !patient.lynch_late_start)))
                {
                patient.genetic_interval=0
                return patient
                }
            else if (patient.age>=35 || (patient.age>=25 && !patient.lynch_late_start))
                {
                patient.genetic_interval=Math.min(2,patient.genetic_interval)
                }
            else if (patient.lynch_late_start)
                {
                patient.genetic_interval=35-patient.age 
                }
            else
                {
                patient.genetic_interval=25-patient.age
                }
            }

        if (patient.genetic_interval===null)
                {
                patient.genetic_interval=100
                }
        
        return patient
}



}

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
   
        {
        if (patient.num_polyps || patient.mult_polyp_question)  //polyps reported in first level questions.
            {
            patient=this.polyp(patient)
            }

        if (patient.prev_crc)//hist of crc reported in first level questions
            {
            patient=this.crc(patient)
            }
            console.log(patient.polyp_int, patient.crc_interval)
        patient.final_int = Math.min(patient.polyp_int, patient.crc_interval);
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
            //surveillance for young patients not meedting above criteria (age and interval set in polyp_guide)   
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
        {
            if (patient.num_polyps && (patient.age<=this.polyp_guide.old-1))//bug here- this is evaluating true with 0 polyps
                {
                patient.polyp_int=1
                }

            else if ((!patient.num_polyps) && (patient.age<=this.polyp_guide.old-2))
                {
                patient.polyp_int=2

                
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
          
         

        patient.polyp_int=patient.polyp_int*this.msec_year-(patient.date_now-patient.scopedate)//milliseconds until colonoscopy due.
          
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
        
    return patient;


    },
    genetic(patient)
    {
    
    }




}

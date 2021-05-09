//object containing attributes and methods to calculate colonoscopy interval
//and need for site check  based on recoomendations from the 2019 guidelines.
//Takes data from patient object created in index.js- adds extra fields to this object.

const intScope=
{
    polyp_guide:   //data for polyp method
        {
        young:50,    //10 years below BCSP age
        old:75,    //max rec. age for screening
        int: 3,    // rec. years for survaillance
        young_low_risk_int: 5 //surv. interval for low risk patients below BCSP age
        },




    calculate_interval(patient)
    //master method to call the methods needed 
        {
        if (patient.polyps)  //polyps reported in first level questions.
            {
            patient=this.polyp(patient)
            }

        if (patient.crc)//hist of crc reported in first level questions
            {
            patient=this.crc(patient)
            }

        return(patient)    
        },
        
    polyp(patient) 
    //calculates surveillance interval and need for site check based on polyps on recent examinations
    {
        if (patient.age<=this.polyp_guide.old-this.polyp_guide.int)   
            {
            //determine if advanced polyp present
            advanced_polyp=false 
            if (patient.size_polyp>=10 || patient.serr_dysplasia || patient.hgd)
                {
                advanced_polyp=true;
                }

            //determine interval
            //2 or more polyps inc advanced polyps or 5 or more polyps - inteval set in polyp_guide
            if ( (advanced_polyp && patient.num_polyps>1) || (patient.num_polyps>4) )
                {
                patient.polyp_int=this.polyp_guide.int;
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
        console.log(patient.num_polyps, typeof patient.num_polyps)
        {
            if (patient.num_polyps && (patient.age<=this.polyp_guide.old-1))//bug here- this is evaluating true with 0 polyps
                {
                patient.polyp_int=1
                }

            else if ((!patient.num_polyps) && (patient.age<=this.polyp_guide.old-2))
                {
                patient.polyp_int=2

                console.log("entered else if")
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

        return(patient)   
    },


    crc(patient)
    //calculate inteval based on previous CRC
    {



    return patient
    },





}

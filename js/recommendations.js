const msec_year=31536000000;
const ms_three_years=94608000000;
//const a_hundred_years=3153600000000


let patient=JSON.parse(localStorage.getItem('patient'));
patient.age=parseFloat(patient.age)

if (patient.second_surv === "true")// convert second surveillance input to Boolean
    {
    patient.second_surv=true
    }
else
    {
    patient.second_surv=false
    }

if (!patient.num_polyps)
    {
    patient.num_polyps=0
    }
else
    {
    patient.num_polyps=parseInt(patient.num_polyps)
    }

patient.size_polyp=parseInt(patient.size_polyp)
patient.polyp_int=100
patient.crc_interval=100
patient.genetic_interval=100
patient.colitis_interval=100
patient.acromegaly_interval=100
patient.final_int=100


patient=intScope.calculate_interval(patient);


let years=0
let months=0
let age_exclusion_text= " since the patient will be over the recommended surveillance age by the date a colonoscopy would otherwise be recommended"
var commentary_text=""
var whether_prev_scope_ender=""
if (patient.scopedate)
    {
    whether_prev_scope_ender= " from the patient's last colonoscopy"   
    }
else
    {
    whether_prev_scope_ender="  from now"   
    }

if (patient.polyps || patient.mult_polyp_question)
{
let start_polyp_text = `Based on the patient's history of`

if (patient.num_polyps >0)
{
 start_polyp_text+=` ${patient.num_polyps} polyp(s) with the largest being ${patient.size_polyp} mm`
    if (patient.mult_polyp_question)
    {
    start_polyp_text+=` and`
    }
}
if (patient.mult_polyp_question)
    {
    start_polyp_text+= ` previous polyps`
    }
 
 start_polyp_text += ` the recommendation would be `

let end_polyp_text=""
if (patient.polyp_int <= 0)
    {
    end_polyp_text= ` a completion colonoscopy now.`
    }
else if (patient.polyp_int === 100 || patient.polyp_age_exclusion)
    {
    end_polyp_text = `no routine polyp surveillance${patient.polyp_age_exclusion? age_exclusion_text : ""}.`
    }
else
    {
    let years=Math.floor(patient.polyp_int)
    let months= Math.floor((patient.polyp_int-years)*12)
    if (months === 0)
        {
        end_polyp_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
        }
    else
        {
        end_polyp_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
        }
    }
    polyp_text=start_polyp_text + end_polyp_text

    commentary_text += polyp_text
    commentary_text += "\n"
    }


if (patient.prev_crc)
    {
    let start_crc_text=`Based on the patient's history of colorectal cancer the recommendation would be `
    let end_crc_text=""
    if (patient.crc_interval <= 0)
        {
        end_crc_text= ` a cancer surveillance colonoscopy now.`
        }
    else if (patient.crc_interval === 100 || patient.crc_age_exclusion)
        {
        end_crc_text = `no further routine colonoscopic cancer surveillance${patient.crc_age_exclusion? age_exclusion_text : ""}.`
        }
    else
        {
            let years=Math.floor(patient.crc_interval)
            let months= Math.floor((patient.crc_interval - years)*12)
            if (months === 0)
                {
                end_crc_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
                }
            else
                {
                end_crc_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
                }
        }
    crc_text=start_crc_text + end_crc_text

    commentary_text += crc_text
    commentary_text += "\n"
    }


    if (patient.genetic)
    {
    let start_genetic_text=`Based on the patient's history of genetic risk and family history the recommendation would be `
    let end_genetic_text=""
    if (patient.genetic_interval <= 0)
        {
        end_genetic_text= ` a surveillance colonoscopy now`
        }
    else if (patient.genetic_interval === 100 || patient.genetic_age_exclusion)
        {
        end_genetic_text = `no routine genetic surveillance${patient.genetic_age_exclusion? age_exclusion_text : ""}.`
        }
    else
        {
            let years=Math.floor(patient.genetic_interval)
            let months= Math.floor((patient.genetic_interval - years)*12)
            if (months === 0)
                {
                end_genetic_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
                }
            else
                {
                end_genetic_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
                }
        }
    genetic_text=start_genetic_text + end_genetic_text

    commentary_text += genetic_text
    commentary_text += "\n"
    }

    if (patient.colitis)
    {
    let start_colitis_text=`Based on the patient's history of colitis, the recommendation would be `
    let end_colitis_text=""
    if (patient.colitis_interval <= 0)
        {
        end_colitis_text= ` a surveillance colonoscopy now.`
        }
    else if (patient.colitis_interval === 100)
        {
        end_colitis_text = `no further routine colonoscopic colitis surveillance.`
        }
    else
        {
            let years=Math.floor(patient.colitis_interval)
            let months= Math.floor((patient.colitis_interval - years)*12)
            if (months === 0)
                {
                end_colitis_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
                }
            else
                {
                end_colitis_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
                }
        }
    colitis_text=start_colitis_text + end_colitis_text

    commentary_text += colitis_text
    commentary_text +="\n"
    }

    if (patient.acromegaly)
    {
    let start_acromegaly_text=`Based on the patient's diagnosis of acromegaly, the recommendation would be `
    let end_acromegaly_text=""
    if (patient.acromegaly_interval <= 0)
        {
        end_acromegaly_text= ` a surveillance colonoscopy now.`
        }
    else if (patient.acromegaly_interval === 100)
        {
        end_acromegaly_text = `no further routine colonoscopic acromegaly surveillance.`
        }
    else
        {
            let years=Math.floor(patient.acromegaly_interval)
            let months= Math.floor((patient.acromegaly_interval - years)*12)
            if (months === 0)
                {
                end_acromegaly_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
                }
            else
                {
                end_acromegaly_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
                }
        }
    acromegaly_text=start_acromegaly_text + end_acromegaly_text

    commentary_text += acromegaly_text
    }

    commentary_text +="\n\n"
    let start_final_text=`Overall therefore, the recommendation is `
    let end_final_text=""
    if (patient.final_int <= 0)
        {
        end_final_text= ` a surveillance colonoscopy now.`
        }
    else if (patient.final_int === 100)
        {
        end_final_text = `no further routine colonoscopic surveillance.`
        }
    else
        {
            let years=Math.floor(patient.final_int)
            let months= Math.floor((patient.final_int - years)*12)
            console.log(patient.final_int - years)
         
            if (months === 0)
                {
                end_final_text= `a surveillance colonoscopy ${years} years ${whether_prev_scope_ender}.`
                }
            else
                {
                end_final_text= `a surveillance colonoscopy ${years} years and ${months} months ${whether_prev_scope_ender}.`
                }
        }
    final_text=start_final_text + end_final_text

    commentary_text += final_text

    let recommendation_text=""
    let next_colonoscopy_time
    let next_colonoscopy_date
    if (patient.scopedate===null)
        {
        next_colonoscopy_time=patient.final_int
        }
    else
        {
        next_colonoscopy_time=patient.final_int-(patient.date_now-patient.scopedate)/msec_year
        }

    next_colonoscopy_date=  new Date(patient.date_now + next_colonoscopy_time * msec_year).toDateString()
console.log(patient.date_now)
console.log(next_colonoscopy_time)
console.log(next_colonoscopy_date)


let start_recommendation_text=`The recommendation is `
    let end_recommendation_text=""
    if (next_colonoscopy_time <= 0)
        {
        end_recommendation_text= ` a surveillance colonoscopy now.`
        }
    else if (patient.final_int === 100)
        {
        end_recommendation_text = `no further routine colonoscopic surveillance.`
        }
    else
        {
        let years=Math.floor(next_colonoscopy_time)
        let months= Math.floor((next_colonoscopy_time - years)*12)
        console.log((patient.final_int - years))
        if((months===11) && (next_colonoscopy_time - years)*12-months > 0.6)//prevents reporting x years and 11 months inappropriately
            {
            years++;
            months=0;
            }
        if (months === 0)
            {
            end_recommendation_text= `a surveillance colonoscopy ${years} years from now`
            }

        else if (years === 0)
            {
            end_recommendation_text= `a surveillance colonoscopy  ${months} months from now`
            }

        else
            {
            end_recommendation_text= `a surveillance colonoscopy ${years} years and ${months} months from now`
            }

        date_text=` which will be around ${next_colonoscopy_date}.`
        end_recommendation_text += date_text   
        }
    recommendation_text = start_recommendation_text + end_recommendation_text
     


    let site_check_text=""
if (patient.site_check || patient.loc_resect)//site check from polyp resecetion or local resection of cancer
    {
    document.getElementById("site_check_outer_holder").classList.remove("hidden")

    if(patient.site_check)
        {
        site_check_text+="Due to the nature of the polyps which were removed, a site check in 2-6 months time should be considered.  "
        if (patient.second_site_check)
            {
            site_check_text +="Since there was a Large Non-Pedunculated Colorectal Polyp (LNPCP) without a confirmed R0 resection margin, an additional site check 12 months after the first site check is recommeded.  "
            }
        site_check_text += "The site check should be carried out but either flexible sigmoidoscopy or colonoscopy depending on the location of the most proximal polyp of concern.\n"
        }
    if(patient.loc_resect)
        {
        interval_since_resection=(patient.date_now-patient.crc_resected)/msec_year
        if (interval_since_resection<=3)
            {
            site_check_text += "Since the cancer was removed by local resection, site checks in accordance with local protocols or MDT advice should be considered e.g 3 monthly checks during the first year and 6 months checks for the next 2 years"
            }
        }
}




console.log(commentary_text)

document.getElementById("commentary_holder").innerText=commentary_text
document.getElementById("recommendation_holder").innerText=recommendation_text
document.getElementById("site_check_holder").innerText=site_check_text




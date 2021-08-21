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

var commentary_text=""
var whether_prev_scope_ender=""
if (patient.scopedate)
    {
    whether_prev_scope_ender= " years from the patient's last colonoscopy"   
    }
else
    {
    whether_prev_scope_ender=" years from now"   
    }
if (patient.polyps)
{
let start_polyp_text=`Based on the patient's history of ${patient.num_polyps} polyps with the largest being ${patient.size_polyp} mm the recommendation would be `
let end_polyp_text=""
if (patient.polyp_int === 0)
    {
    end_polyp_text= ` a completion colonoscopy now`
    }
else if (patient.polyp_int === 100)
    {
    end_polyp_text = `no routine polyp surveillance`
    }
else
    {
    end_polyp_text= `a surveillance colonoscopy ${patient.polyp_int} ${whether_prev_scope_ender}.`
    }
    polyp_text=start_polyp_text + end_polyp_text

    commentary_text += polyp_text
    commentary_text += "\n"
    }


if (patient.prev_crc)
    {
    let start_crc_text=`Based on the patient's history of colorectal cancer the recommendation would be `
    let end_crc_text=""
    if (patient.crc_interval === 0)
        {
        end_crc_text= ` a cancer surveillance colonoscopy now`
        }
    else if (patient.crc_interval === 100)
        {
        end_crc_text = `no further routine colonoscopic cancer surveillance`
        }
    else
        {
            end_crc_text= `a cancer surveillance colonoscopy ${patient.crc_interval} ${whether_prev_scope_ender}.`
        }
    crc_text=start_crc_text + end_crc_text

    commentary_text += crc_text
    commentary_text += "\n"
    }


    if (patient.genetic)
    {
    let start_genetic_text=`Based on the patient's history of genetic risk and family history the recommendation would be `
    let end_genetic_text=""
    if (patient.genetic_interval === 0)
        {
        end_genetic_text= ` a surveillance colonoscopy now`
        }
    else if (patient.genetic_interval === 100)
        {
        end_genetic_text = `no further routine colonoscopic genetic surveillance`
        }
    else
        {
        end_genetic_text= `a surveillance colonoscopy ${patient.genetic_interval} ${whether_prev_scope_ender}.`
        }
    genetic_text=start_genetic_text + end_genetic_text

    commentary_text += genetic_text
    commentary_text += "\n"
    }

    if (patient.colitis)
    {
    let start_colitis_text=`Based on the patient's history of colitis, the recommendation would be `
    let end_colitis_text=""
    if (patient.colitis_interval === 0)
        {
        end_colitis_text= ` a surveillance colonoscopy now`
        }
    else if (patient.colitis_interval === 100)
        {
        end_colitis_text = `no further routine colonoscopic colitis surveillance`
        }
    else
        {
        end_colitis_text= `a surveillance colonoscopy ${patient.colitis_interval} ${whether_prev_scope_ender}.`
        }
    colitis_text=start_colitis_text + end_colitis_text

    commentary_text += colitis_text
    commentary_text +="\n"
    }

    if (patient.acromegaly)
    {
    let start_acromegaly_text=`Based on the patient's diagnosis of acromegaly, the recommendation would be `
    let end_acromegaly_text=""
    if (patient.acromegaly_interval === 0)
        {
        end_acromegaly_text= ` a surveillance colonoscopy now`
        }
    else if (patient.acromegaly_interval === 100)
        {
        end_acromegaly_text = `no further routine colonoscopic acromegaly surveillance`
        }
    else
        {
        end_acromegaly_text= `a surveillance colonoscopy ${patient.acromegaly_interval} ${whether_prev_scope_ender}.`
        }
    acromegaly_text=start_acromegaly_text + end_acromegaly_text

    commentary_text += acromegaly_text
    }

    commentary_text +="\n\n"
    let start_final_text=`Overall therefore, the recommendation is `
    let end_final_text=""
    if (patient.final_int === 0)
        {
        end_final_text= ` a surveillance colonoscopy now`
        }
    else if (patient.final_int === 100)
        {
        end_final_text = `no further routine colonoscopic surveillance`
        }
    else
        {
        end_final_text= `a surveillance colonoscopy ${patient.final_int} ${whether_prev_scope_ender}.`
        }
    final_text=start_final_text + end_final_text

    commentary_text += final_text
    
//Ad paragraph on site check here!!!!!!!!!!

console.log(commentary_text)

document.getElementById("commentary_holder").innerText=commentary_text
//for testing only

document.getElementById("first_site_check").innerText=patient.site_check
document.getElementById("second_site_check").innerText=patient.second_site_check



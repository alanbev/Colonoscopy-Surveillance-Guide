const msec_year=31536000000;
const ms_three_years=94608000000;
//const a_hundred_years=3153600000000

let patient=JSON.parse(localStorage.getItem('patient'));
patient.age=parseFloat(patient.age)

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


//for testing only
document.getElementById("surv_int_test").innerText=(patient.final_int)//+"crc"+typeof(patient.crc_interval)+ patient.crc_interval / msec_year;
document.getElementById("first_site_check").innerText=patient.site_check
document.getElementById("second_site_check").innerText=patient.second_site_check



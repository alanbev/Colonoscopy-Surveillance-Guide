const msec_year=31536000000;
const ms_three_years=94608000000;
const a_hundred_years=3153600000000

let patient=JSON.parse(localStorage.getItem('patient'));
patient.age=parseInt(patient.age)
patient.num_polyps=parseInt(patient.num_polyps)
patient.size_polyp=parseInt(patient.size_polyp)
patient.polyp_int=a_hundred_years
patient.crc_interval=a_hundred_years
patient.final_int=a_hundred_years

patient=intScope.calculate_interval(patient);


//for testing only
document.getElementById("surv_int_test").innerText=(patient.final_int/msec_year)//+"crc"+typeof(patient.crc_interval)+ patient.crc_interval / msec_year;
document.getElementById("first_site_check").innerText=patient.site_check
document.getElementById("second_site_check").innerText=patient.second_site_check





let patient=JSON.parse(localStorage.getItem('patient'));

patient=intScope.calculate_interval(patient);


//for testing only
document.getElementById("surv_int_test").innerText=patient.polyp_int;
document.getElementById("first_site_check").innerText=patient.site_check
document.getElementById("second_site_check").innerText=patient.second_site_check


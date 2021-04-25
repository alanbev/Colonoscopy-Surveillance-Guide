


function additionalQuestions(e){
    e.preventDefault();
    let first_form_contents=document.getElementById('first_level_questions').elements;

    if (first_form_contents["polyps"].checked)
    patient.polyps=true
    document.getElementById('polyp_questions').classList.remove("hidden")


}

let first_form=document.getElementById('first_level_questions')
first_form.addEventListener("submit", additionalQuestions)



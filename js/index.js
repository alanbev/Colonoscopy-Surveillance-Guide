//callouts for adding questions to view

function additionalQuestions(e)
{
    e.preventDefault();
    let first_form_contents=document.getElementById('first_level_questions').elements;

    if (first_form_contents["polyps"].checked)
    {
    patient.polyps=true;
    document.getElementById('polyp_questions').classList.remove("hidden");
    }

    if (first_form_contents["prev_crc"].checked)
    {
    patient.crc=true;
    document.getElementById('crc_questions').classList.remove("hidden");
    }

    if (first_form_contents["genetic"].checked)
    {
        patient.crc=true;
        document.getElementById('genetic_risk_questions').classList.remove("hidden");
    }

    if (first_form_contents["colitis"].checked)
    {
        patient.crc=true;
        document.getElementById('colitis_questions').classList.remove("hidden");
    }   
}

function show_prev_polp_questions(e)
{
    if (e.target.checked) 
    {
        if (!!document.getElementById("mult_polyp_container")===false)
        {
            let third_level_questions_polyps=document.getElementById("third_level_questions_polyps");
            third_level_questions_polyps.classList.remove("hidden")
            let mult_polyp_question=document.createElement("p");
            mult_polyp_question.setAttribute("id", "mult_polyp_container")
            

            if (patient.age>=60 && !(document.getElementById("genetic").checked))
                {
                mult_polyp_question.innerHTML=mult_polyps_20;  //from third_level_questions.js
                }
            else 
                {
                mult_polyp_question.innerHTML=mult_polyps_10;  //from third_level_questions.js
                }
            third_level_questions_polyps.append(mult_polyp_question);
        } 
    }
    else if(!!document.getElementById("mult_polyp_container") &&  !(document.getElementById("prev_polyps").checked || document.getElementById("mcra").checked))
    {
        let mult_polyp_container=document.getElementById("mult_polyp_container"); 
        mult_polyp_container.remove();
        let third_level_questions_polyps=document.getElementById("third_level_questions_polyps");
        third_level_questions_polyps.classList.add("hidden")
    } 

}

function show_fh_questions(e)
{
    if (e.target.checked) 
    {
        if (!!document.getElementById("fh_container")===false)
        {
            let third_level_questions_fh=document.getElementById("third_level_questions_fh");
            third_level_questions_fh.classList.remove("hidden")
            let fh_questions=document.createElement("p");
            fh_questions.setAttribute("id", "fh_container")
               fh_questions.innerHTML=fh_html  //from third_level_questions.js
            third_level_questions_fh.append(fh_questions);
        } 
    }
    else if(!!document.getElementById("fh_container") &&  !(document.getElementById("fh_crc").checked || document.getElementById("colitis_fh_crc").checked))
    {
        let fh_container=document.getElementById("fh_container"); 
        fh_container.remove();
        let third_level_questions_fh=document.getElementById("third_level_questions_fh");
        third_level_questions_fh.classList.add("hidden")

    } 
}


function show_lynch_questions(e)
{
    if (e.target.checked)
    {
        if (patient.age<35)
        {
            if (!!document.getElementById("lynch_container")===false)
            {
                let third_level_questions_lynch=document.getElementById("third_level_questions_lynch");
                third_level_questions_lynch.classList.remove("hidden")
                let lynch_questions=document.createElement("p");
                lynch_questions.setAttribute("id", "lynch_container")
                lynch_questions.innerHTML=lynch_late_start;  //from third_level_questions.js
                third_level_questions_lynch.append(lynch_questions);
            } 
        }
    }
    else if(!!document.getElementById("lynch_container") &&  !(document.getElementById("lynch").checked ))
    {
        let lynch_container=document.getElementById("lynch_container"); 
        lynch_container.remove();
        let third_level_questions_lynch=document.getElementById("third_level_questions_lynch");
        third_level_questions_lynch.classList.add("hidden")

    } 
    
}


//event listeners
let first_form=document.getElementById('first_level_questions');
first_form.addEventListener("submit", additionalQuestions);

let prev_polyps=document.getElementById("prev_polyps");
prev_polyps.addEventListener("click", show_prev_polp_questions);
let mcra=document.getElementById("mcra");
mcra.addEventListener("click", show_prev_polp_questions);


let fh_crc=document.getElementById("fh_crc");
fh_crc.addEventListener("click", show_fh_questions);
let colitis_fh_crc=document.getElementById("colitis_fh_crc");
colitis_fh_crc.addEventListener("click", show_fh_questions);

let lynch=document.getElementById("lynch");
lynch.addEventListener("click", show_lynch_questions);





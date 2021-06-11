let age;
let crc=false
let first_crc_question_displayed=false
let date_today=new Date()
let date_today_int=date_today.getTime()
const msec_year=31536000000;
const msec_three_years=94608000000


//callouts for adding questions to view

function additionalQuestions(e)
{
    e.preventDefault();

    
    let first_form_contents=document.getElementById('first_level_questions').elements;
    age= first_form_contents.age.value

    if (first_form_contents["polyps"].checked)
    {
    document.getElementById('polyp_questions').classList.remove("hidden");
    }

    if (first_form_contents["prev_crc"].checked)
    {
    crc=true;
    document.getElementById('crc_questions').classList.remove("hidden");
    }

    if (first_form_contents["genetic"].checked)
    {
        document.getElementById('genetic_risk_questions').classList.remove("hidden");
    }

    if (first_form_contents["colitis"].checked)
    {
        document.getElementById('colitis_questions').classList.remove("hidden");
    }  
   
   
    if (crc && !first_crc_question_displayed && !first_form_contents["scopedate"].value ) //handles CRC with no prev colooscopy date specified i.e asks if first scope done- if not surveillance will be due bassed on rescetion date.- if it is, will request first surv date and calculates from that 
        {
            first_crc_question_displayed=true; //prevents question displaying twice
            let first_surv_question=document.createElement("p");
            first_surv_question.innerHTML=first_surv;
            document.getElementById('crc_questions').append(first_surv_question);  //question html in third_level_questions.js-  hidden whne first inserted -visible once colonoscpy date inserted
            document.getElementById("crc_resected").addEventListener("input",()=>{document.getElementById("first_surv_done").classList.remove("hidden")});  //prevents first scope dome from being checkable unless resection date entered.
            document.getElementById("first_surv_done").addEventListener("click",second_surv_question); //event listener created only if element exists
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
            

            if (age>=60 && !(document.getElementById("genetic").checked))
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

function show_piecemeal_polypectomy(e)
{
    if (e.target.checked)
    {
       
        if (!!document.getElementById("piecemeal_container")===false)
        {
            let third_level_questions_piecemeal=document.getElementById("third_level_questions_piecemeal");
            third_level_questions_piecemeal.classList.remove("hidden")
            let piecemeal_questions=document.createElement("p");
            piecemeal_questions.setAttribute("id", "piecemeal_container")
            piecemeal_questions.innerHTML=piecemeal_polypectomy;  //from third_level_questions.js
            third_level_questions_piecemeal.append(piecemeal_questions);
        } 
        
    }
    else if(!!document.getElementById("piecemeal_container") &&  !(document.getElementById("piecemeal_resection").checked ))
    {
        let piecemeal_container=document.getElementById("piecemeal_container"); 
        piecemeal_container.remove();
        let third_level_questions_piecemeal=document.getElementById("third_level_questions_piecemeal");
        third_level_questions_piecemeal.classList.add("hidden")

    }
    
}

function second_surv_question(e)
//asks if second surveillance done if first has been doen and more than 3 years ince resection- if less than 3 years go directly to asking for first surveillance scope date
{
if (e.target.checked)
    {   
        let resection_date_element=document.getElementById("crc_resected");
        let resection_date=resection_date_element.valueAsNumber;
        if ((date_today_int-resection_date) > msec_three_years) 
        {
            if (!!document.getElementById("second_crc_container")===false)
            {
                let third_level_questions_crc=document.getElementById("third_level_questions_crc");
                third_level_questions_crc.classList.remove("hidden")
                let second_crc_question=document.createElement("p");
                second_crc_question.setAttribute("id", "second_crc_container")
                second_crc_question.innerHTML=second_surv;  //from third_level_questions.js
                third_level_questions_crc.append(second_crc_question);
                second_crc_question.addEventListener("click", first_CRC_scopedate)
            } 
        }
        else 
            {
            first_CRC_scopedate();
            }
        }
    
else if(!!document.getElementById("second_crc_container") &&  !(document.getElementById("first_surv_done").checked ))
{
    let second_crc_container=document.getElementById("second_crc_container"); 
    second_crc_container.remove();
    let third_level_questions_crc=document.getElementById("third_level_questions_crc");
    third_level_questions_crc.classList.add("hidden")

} 
    

    }

function first_CRC_scopedate(e)
//callout to request date of first survaillance colonoscopy if second not already done
{
   
if (!!document.getElementById("second_surv_not_done")===false || !!document.getElementById("second_surv_not_done").checked ) 
    if (!!document.getElementById("first_crc_surv_date_container")===false) //prevents duplication of input filed
    {
    let third_level_questions_crc=document.getElementById("third_level_questions_crc");
    third_level_questions_crc.classList.remove("hidden")
    
    let first_CRC_surv_date=document.createElement("p");
    first_CRC_surv_date.setAttribute("id", "first_crc_surv_date_container")
    first_CRC_surv_date.innerHTML=date_first_crc_surveillance  //from third_level_questions.js
    third_level_questions_crc.append(first_CRC_surv_date);
    
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
        if (age<35)
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

function readForm(e)
//funtion to read form date into patient object
{
let patient={};   
let allData = document.querySelectorAll("input");
allData.forEach(element=>
    {
        if(element.type==="checkbox")
        {
            patient[element.name]=element.checked;
        }
        else if (element.type==="radio")
        {
            if(element.checked)
            {
                patient[element.name]=element.value;
            }
        }
        else
        {
            patient[element.name]=element.value;
        }

    });
    patient.date_now=Date.now()
    console.log(patient);
    localStorage.setItem('patient', JSON.stringify(patient))
    window.open('html/recommendations.html')
}




//event listeners
let first_form=document.getElementById('first_level_questions');
first_form.addEventListener("submit", additionalQuestions);

let prev_polyps=document.getElementById("prev_polyps");
prev_polyps.addEventListener("click", show_prev_polp_questions);
let mcra=document.getElementById("mcra");
mcra.addEventListener("click", show_prev_polp_questions);

let piecemeal_polypectomy=document.getElementById("piecemeal_resection");
piecemeal_polypectomy.addEventListener("click", show_piecemeal_polypectomy);

let fh_crc=document.getElementById("fh_crc");
fh_crc.addEventListener("click", show_fh_questions);
let colitis_fh_crc=document.getElementById("colitis_fh_crc");
colitis_fh_crc.addEventListener("click", show_fh_questions);

let lynch=document.getElementById("lynch");
lynch.addEventListener("click", show_lynch_questions);

let final_submit=document.getElementById("form_finished");
final_submit.addEventListener("click", readForm)




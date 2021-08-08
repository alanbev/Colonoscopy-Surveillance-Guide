
var first_surv=`<p>
<label for="first_surv_done"> First (year 1) surveillance colonoscopy done?</label>
<input type="checkbox" id ="first_surv_done" name="first_surv_done"class="hidden"/>
</p>`

var second_surv=`<p>Has second CRC Colonoscopy been done?</p> <p>(3 years after first CRC surveillance)</p>
<p>
<label for="second_surv_done"> Yes</label>
<input type="radio" id ="second_surv_done" value=true name="second_surv"/>

<label for="second_surv_not_done">No</label>
<input type="radio" id="second_surv_not_done" value=false name="second_surv"/>
</p>
</p>`

var date_first_crc_surveillance=`<p>
<label for="date_first_CRC_surveillance"> Date of first CRC surveillance colonoscopy</label>
<input type="date" id="date_first_CRC_surveillance" name="date_first_CRC_surveillance" required />
</p>`

var fh_html=`
<p>
<!-- HTLM for 3rd level family history questions-->   
<p id=fdr_checkbox> Number of FDRs with CRC:-
<p>
 <label for="no_fdr">None </label>
 <input type="radio" id="no_fdr" name="numb_fdr" value=0>

<label for="one_fdr"> One </label>
<input type="radio" id="one_fdr" name="numb_fdr" value=1>

<label for="two_fdr">Two </label>
<input type="radio" id="two_fdr" name="numb_fdr" value=2>

<label for="three-FDR">Three or more</label>
<input type="radio" id="three_fdr" name="numb_fdr" value=3>
</p>
</p>

<p><label for="fdr_under_50"> FDR with CRC diagnosed under 50</label>
<input type="checkbox"id="fdr_under_50" name="fdr_under_50"/>
</p>

<p><label for="fdr_multi_gen">FDRs with CRC in >1 Generation</label>
<input type="checkbox" id="fdr_multi_gen" name="fdr_multi_gen">
</p>
</p>
`

var mult_polyps_20=`
<label for='mult_polyp_question'> More than 20 polyps in lifetime\n or more than 10 polyps with a family history of CRC or multiple polyps </label>
<input type='checkbox' id='mult_polyp_question' name='mult_polyp_question'/>   
`

var mult_polyps_10=`
<label for='mult_polyp_question'> More than 10 polyps in lifetime </label>
<input type='checkbox' id='mult_polyp_question' name='mult_polyp_question'/>
`

var lynch_late_start=`
<label for="lynch_late_start">Lynch MLH1/MSH2 type </label>
<input type="checkbox" id="lynch_late_start" name="lynch_late_start"/>`

var sps_first_question_html=`<p>Has the colon been cleared of all polyps >5mm?</p> 
<p>
<label for="sps_colon_cleared_yes"> Yes</label>
<input type="radio" id ="sps_colon_cleared_yes" value=true name="sps_colon_cleared"/>

<label for="sps_colon_cleared_no">No</label>
<input type="radio" id="sps_colon_cleared_no" value=false name="sps_colon_cleared"/>
</p>`

var sps_additional_question=`<p>Were there any polyps larger than 10mm on the patient's last colonoscopy?</p> 
<p>
<label for="sps_large_polyps_yes"> Yes</label>
<input type="radio" id ="sps_large_polyps_yes" value=true name="sps_large_polyps"/>

<label for="sps_large_polyps_no">No</label>
<input type="radio" id="sps_large_polyps_no" value=false name="sps_large_polyps"/>
</p>`
    
var pjs_previous_polyps_html=`<p>Has the patient had polyps on any previous colonoscopy?</p> 
<p>
<label for="pjs_prev_polyps_yes"> Yes</label>
<input type="radio" id ="pjs_prev_polyps_yes" value=true name="pjs_prev_polyps"/>

<label for="pjs_prev_polyps_no">No</label>
<input type="radio" id="pjs_prev_polypsno" value=false name="pjs_prev_polyps"/>
</p>`


var piecemeal_polypectomy_question=`<p>For polyps resected piecemeal:-<p>
    <p><label for="over_ten_mm_piecemeal">Sessile Polyp 10mm or larger</label>
        <input type="checkbox" id="over_ten_mm_piecemeal" name="over_ten_mm_piecemeal"/>

    <p><label for="hgd_piecemeal">HGD in this polyp </label>
        <Input type="checkbox" id="hgd_piecemeal" name="hgd_piecemeal"/>

    <p><label for="serr_dysplasia_piecemeal">Serrated polyp with dysplasia</label>
        <input type="checkbox" id="serr_dysplasia_piecemeal" name="serr_dysplasia_piecemeal"/>
    </p>`

/*We suggest that where histological completeness of excision
cannot be determined in patients with non-pedunculated
polyps
of 10–19 mm in size, or an adenoma containing high-grade
dysplasia, or a serrated polyp containing any dysplasia, then a
site-check
should be considered within 2–6 months. The need
for subsequent surveillance should then be determined based on
the high-risk
surveillance criteria.
GRADE of evidence: Low
Strength of recommendation: Weak*/
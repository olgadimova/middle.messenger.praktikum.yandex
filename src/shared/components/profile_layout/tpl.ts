const tpl = `
{{{profileHeader}}}
{{#if isForm}}
<form class="formInfo" id="{{formId}}">
    <ul>
        {{{fields}}}
    </ul>
    <div class="submitButton">
        {{{submitButton}}}
    </div>

    <p id="formError" class="error">{{errorText}}</p>
</form>
{{else}}
<div class="formInfo">
    <ul>
        {{{fields}}}
    </ul>
</div>

<div class="profileFooter">
    {{{profileFooter}}}
</div>
{{/if}}

{{{backButton}}}
`;

export default tpl;

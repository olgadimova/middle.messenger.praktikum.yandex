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

    <p id="formError" class="formError" />
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

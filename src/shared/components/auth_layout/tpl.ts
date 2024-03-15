const tpl = `
<h1 class="authTitle">{{title}}</h1>
<form id="{{formId}}">
    <ul>
        {{{fields}}}
    </ul>
    <div class="authActionButtons">
    {{{submitButton}}}
    {{{link}}}
    </div>
</form>

<p id="formError" class="error">{{error}}</p>
`;

export default tpl;

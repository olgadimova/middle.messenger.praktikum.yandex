const tpl = `
<h1 class="authTitle">Вход</h1>
<form id="{{formId}}">
    <ul>
        {{{fields}}}
    </ul>
    <div class="authActionButtons">
    {{{submitButton}}}
    {{{link}}}
    </div>
</form>
`;

export default tpl;

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
</form>
{{else}}
<div class="formInfo">
    <ul>
        {{{fields}}}
    </ul>
</div>
<a href="/profile-update">Изменить данные</a>
<hr />
<a href="/password-update">Изменить пароль</a>
<hr />
<a href="/" class="logoutButton">Выйти</a>
{{/if}}

{{{backButton}}}
`;

export default tpl;

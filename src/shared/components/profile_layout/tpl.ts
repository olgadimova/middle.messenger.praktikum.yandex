const tpl = `
{{{profileHeader}}}
{{#if isForm}}
<form class="formInfo">
    <ul>
        {{{fields}}}
    </ul>
    <div class="submitButton">
        {{> button/button type="submit" label="Сохранить"}}
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

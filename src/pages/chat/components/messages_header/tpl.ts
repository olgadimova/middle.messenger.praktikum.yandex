const tpl = `
<div class="chatTitle">
<div class="chatAvatar">
    <img src={{#if avatar}}
        "https://ya-praktikum.tech/api/v2/resources/{{avatar}}"
        {{else}}"/assets/avatar.svg"{{/if}} 
        width='40px' height='40px' alt='chat image'
    />
</div>
<p>{{chatTitle}}(участники: {{usersLength}})</p>
</div>
<div class="manageChat">
{{{deleteChatButton}}}
{{{manageChatButton}}}
<div id="manageChatModal" class="manageChatMenu" style="display: none;">
    {{{actions}}}
</div>
</div>
`;

export default tpl;

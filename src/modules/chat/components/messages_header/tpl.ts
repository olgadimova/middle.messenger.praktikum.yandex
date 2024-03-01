const tpl = `
<div class="chatTitle">
<div class="chatAvatar">
    <img src="/assets/avatar.svg" width="40px" height="40px" alt="user avatar" />
</div>
<p>Вадим</p>
</div>
<div class="manageChat">
<button type="button" id="toggleManageChatModal" class="manageChatButton">
    <img src="/assets/more.svg" width="25px" height="25px" alt="user avatar" />
</button>
<div id="manageChatModal" class="manageChatMenu" style="display: none;">
    {{{actions}}}
</div>
</div>
`;

export default tpl;

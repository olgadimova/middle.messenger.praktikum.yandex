const tpl = `
<div class="itemAvatar">
    <img src="/assets/avatar.svg" width="40px" height="40px" alt="user avatar" />
</div>
<div class="itemInfo">
    <p>{{this.title}}</p>
    <p class="itemDescription">
    {{this.lastMessage.title}}
    </p>
</div>
<div>
    <p class="itemStatusTime">
        {{this.lastMessage.createdAt}}
    </p>
    {{#if this.unreadMessages }}
    <div class="itemStatusUnread">
        <span>{{this.unreadMessages}}</span>
    </div>
    {{/if}}
</div>
`;

export default tpl;

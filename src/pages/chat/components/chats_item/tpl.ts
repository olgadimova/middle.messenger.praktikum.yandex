const tpl = `
<div class="itemAvatar">
    <img src={{#if avatarSrc}}
    "https://ya-praktikum.tech/api/v2/resources/{{avatarSrc}}"
    {{else}}"/assets/avatar.svg"{{/if}} 
    width='40px' height='40px' alt='user avatar image'
    class="avatarImage"
    />
</div>
<div class="itemInfo">
    <p>{{this.title}}</p>
    <p class="itemDescription">
    {{this.last_message.content}}
    </p>
</div>
<div>
    <p class="itemStatusTime">
        {{this.last_message.time}}
    </p>
    {{#if this.unreadMessages }}
    <div class="itemStatusUnread">
        <span>{{this.unread_count}}</span>
    </div>
    {{/if}}
</div>
`;

export default tpl;

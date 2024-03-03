const tpl = `
<label for='avatar' class='avatar'>
    <img src={{#unless avatarSrc}}"/assets/avatar.svg"{{/unless}} width='100px' height='100px' alt='user avatar image'
      style="cursor: {{#if canEditAvatar}}pointer{{else}}initial{{/if}}" />
    {{#if canEditAvatar}}
      <input id='avatar' name='avatar' type='file' hidden />
    {{/if}}
</label>
{{#if userName}}
    <h3>{{userName}}</h3>
{{/if}}
`;

export default tpl;
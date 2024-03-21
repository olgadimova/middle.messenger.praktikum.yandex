const tpl = `
<label for='avatar' class='avatar'>
    <img src={{#if avatarSrc}}
      "https://ya-praktikum.tech/api/v2/resources/{{avatarSrc}}"
      {{else}}"/assets/avatar.svg"{{/if}} 
      width='100px' height='100px' alt='user avatar image'
      style="cursor: {{#if canEditAvatar}}pointer{{else}}initial{{/if}}"
      class="avatarImage"
    />
</label>
{{#if canEditAvatar}}
  {{{editAvatarForm}}}
{{/if}}

{{#if userName}}
    <h3>{{userName}}</h3>
{{/if}}
`;

export default tpl;

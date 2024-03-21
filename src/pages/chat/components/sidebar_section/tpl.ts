const tpl = `
{{{header}}}

<div class="chats">
    {{#if chatsLength}}
        <ul>
            {{{chats}}}
        </ul>
    {{else}}
        <p class="alignCenter">Чатов не найдено.</p>
    {{/if}}
</div>
`;

export default tpl;

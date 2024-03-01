const tpl = `
{{{header}}}    

{{#if selectedChatId}}
    <div class="chatBody">
        <div class="chatNotEmpty">
        <p class="chatMessageDate">20 июня</p>
        {{{messages}}}
        </div>
    </div>
{{else}}
    <div class="chatEmpty">
        <p>Выберите чат чтобы оправить сообщение</p>
    </div>
{{/if}}

{{{footer}}}
{{{modals}}}
`;

export default tpl;

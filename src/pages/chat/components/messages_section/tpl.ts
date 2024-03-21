const tpl = `
{{#if selectedChatId}}
    {{{header}}} 
    <div class="chatBody">
        <div class="chatNotEmpty">
        {{{messages}}}
        </div>
    </div>
    {{{footer}}}
{{else}}
    <div class="chatEmpty">
        <p>Выберите чат для отправки сообщения</p>
    </div>
{{/if}}
`;

export default tpl;

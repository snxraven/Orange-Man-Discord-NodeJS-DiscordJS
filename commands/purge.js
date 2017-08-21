exports.run = function(client, message, args) {
    let messagecount = parseInt(args.join(' '));
    message.channel.fetchMessages({
        limit: messagecount
    }).then(messages => message.channel.bulkDelete(messages));
};

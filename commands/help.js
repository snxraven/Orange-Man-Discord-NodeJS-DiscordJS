exports.run = function(client, message, args) {
    message.channel.sendEmbed({
        color: 3447003,

        title: 'HELP!',
        description: 'Here is a list of all user commands.',
        fields: [{
                name: 'Urban Dictonary',
                value: '.urban (keyword)'
            },
            {
                name: 'Random Facts for a Date',
                value: '.facts month (number) day (number)'
            },
            {
                name: 'Random Facts for Today',
                value: '.today'
            },
            {
                name: 'Random Movie Quotes',
                value: '.movies'
            },
            {
                name: 'Random Famous Quotes',
                value: '.quotes'
            },
            {
                name: 'Whois Website Lookup',
                value: '.whois google.com'
            },
            {
                name: 'Lookup Hashtag Meanings',
                value: '.hashtag (hashtag)'
            },
            {
                name: 'Random Chuck Norris Jokes',
                value: '.chuck'
            },
            {
                name: 'Lyrics',
                value: '.lyrics Artist - Name'
            },

            {
                name: 'Google Image Search - Random',
                value: '.gi (search term)'
            },
            {
                name: 'Ping Domain',
                value: '.ping (domain.com)'
            },
            {
                name: 'Your Beautiful',
                value: '.you\'rebeautiful'
            },
            {
                name: 'Wake Me Up Inside',
                value: '.wakemeupinside'
            },
            {
                name: 'Its Too Late.',
                value: '.itstoolate'
            },
            {
                name: 'Never Gonna',
                value: '.nevergonna'
            },
            {
                name: 'If you Like It',
                value: '.ifyoulikeit'
            },
            {
                name: 'Bee Movie',
                value: '.bee'
            }
        ],
        timestamp: new Date(),
        footer: {
            text: '© 2017 Orange Man!'
        }
    });
}

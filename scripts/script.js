const svg = document.getElementById('LiyueSVG');
const mapGroup = document.getElementById('Group 1');
let scale = 0.5;
const minScale = 0.5; // Minimum scale
const maxScale = 2;     // Maximum scale
let originX = 200;
let originY = 0;
let isDragging = false;
let startX, startY;
const dragSensitivity = 0.45; // Adjust this value to control drag sensitivity

const regionConfig = {
    "Chasm": {
        name: 'Chasm',
        conditions: [
            {
                conditions: [['any']], ost: [
                    { name: 'Wordless Cliffs', youtubeUrl: 'https://www.youtube.com/watch?v=ycHqRJha6gU', spotifyUrl: 'https://open.spotify.com/track/1b5oGPaIeGNS7lSHkWwx2L?si=5d2c9da96efc4543', albumImage: "Millelith's_Watch.webp" },
                    { name: 'On the Vast Earth', youtubeUrl: 'https://www.youtube.com/watch?v=xhivQ1IVsE0', spotifyUrl: 'https://open.spotify.com/track/2IIkQAkZlQzN2XATuHmFwU?si=5844a0aba32b4ab8', albumImage: "Millelith's_Watch.webp" }
                ]
            },
            {
                conditions: [['day']], ost: [
                    { name: 'Lithic Oath', youtubeUrl: 'https://www.youtube.com/watch?v=lnMYwTxS6L0', spotifyUrl: 'https://open.spotify.com/track/1eRV4DBbemrmgZE5zDAac1?si=4d1988aab2334649', albumImage: "Millelith's_Watch.webp" },
                    { name: 'Beyond the Distant Horizon', youtubeUrl: 'https://www.youtube.com/watch?v=SliDoEJBCDA', spotifyUrl: 'https://open.spotify.com/track/5S6cNMZVlVZYSJNfqgK3pY?si=bff1a9a43eec4f1c', albumImage: "Millelith's_Watch.webp" },
                    { name: "Defenders' Volition", youtubeUrl: 'https://www.youtube.com/watch?v=9yOFh4D_snk', spotifyUrl: 'https://open.spotify.com/track/5hoWDIokFzR9JRjpihleH9?si=6da7b33d2a7c4311', albumImage: "Millelith's_Watch.webp" },
                    { name: 'Solitary Stray Bird', youtubeUrl: 'https://www.youtube.com/watch?v=qetnKWjj9sc', spotifyUrl: 'https://open.spotify.com/track/7a85THp6RcyrR0zELippp0?si=5cc3320031584d91', albumImage: "Millelith's_Watch.webp" },
                    { name: 'The Faint Distant Mountains', youtubeUrl: 'https://www.youtube.com/watch?v=fGykaB7Oo3s', spotifyUrl: 'https://open.spotify.com/track/3W7hbjIuE0sJioAdcsvL8n?si=5961b01df4d04aa5', albumImage: "Millelith's_Watch.webp" },
                    { name: 'Wandering Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=sEiE5ju5Tao', spotifyUrl: 'https://open.spotify.com/track/2WD19ZbjQn0GRNPPSnfAzy?si=e174f11c20e34846', albumImage: "Millelith's_Watch.webp" }
                ]
            },
            {
                conditions: [['night']], ost: [
                    { name: 'Under the Clear Sky', youtubeUrl: 'https://www.youtube.com/watch?v=Jq4WK21CEN8', spotifyUrl: 'https://open.spotify.com/track/6m7WD5NlAqZsYkB25O3s9Y?si=ec1f7ee535994fed', albumImage: "Millelith's_Watch.webp" },
                    { name: 'As Dusk Falls', youtubeUrl: 'https://www.youtube.com/watch?v=NZZydJspQbc', spotifyUrl: 'https://open.spotify.com/track/4egWRaAwOemh0ngzMETGnH?si=3fa6514247c843c9', albumImage: "Millelith's_Watch.webp" },
                    { name: 'On a Cold Night', youtubeUrl: 'https://www.youtube.com/watch?v=aezf4RCUA9E', spotifyUrl: 'https://open.spotify.com/track/1ZDu8CIQaClazCGvwdpWjj?si=2fe6a1b4bb094d2f', albumImage: "Millelith's_Watch.webp" },
                    { name: 'The Starlit Dome', youtubeUrl: 'https://www.youtube.com/watch?v=fYJYfLHqkaY', spotifyUrl: 'https://open.spotify.com/track/6rYSQHvSxu1NeyUB5FrjKs?si=4a2c625c0f9147b8', albumImage: "Millelith's_Watch.webp" },
                    { name: 'Moon Above the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=2oBCLLIpQWw', spotifyUrl: 'https://open.spotify.com/track/0evvJfPMagR2Jns310cgvw?si=d82967be806e4965', albumImage: "Millelith's_Watch.webp" }
                ]
            }
        ],
        backgroundImage: 'chasm.jpg'
    },
    "Lisha": {
        name: 'Lisha',
        conditions: [
            {
                conditions: [['rain']], ost: [
                    { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['clear sky']], ost: [
                    { name: 'Flickering Petals', youtubeUrl: 'https://www.youtube.com/watch?v=Ty0rDWq2Bm8', spotifyUrl: 'https://open.spotify.com/track/13EOLLe5BZMrb6lZY0xRIt?si=77213bc19e564d09', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Solitude Mountains', youtubeUrl: 'https://www.youtube.com/watch?v=5uMfxCk4_CU', spotifyUrl: 'https://open.spotify.com/track/6Aqd3mAAxcF82uzBLWdEEV?si=eded7428fd0e40ca', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Distant Resonance', youtubeUrl: 'https://www.youtube.com/watch?v=WSCoPqHz5Ts', spotifyUrl: 'https://open.spotify.com/track/7pmyWB5iiU5Md1g2lWk5xK?si=24eb7d82c10d456d', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Foregone Giants', youtubeUrl: 'https://www.youtube.com/watch?v=c62GPDEgq5s', spotifyUrl: 'https://open.spotify.com/track/0mvv7EducUmms2LkU4s0QT?si=7b12f212b2464525', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['domain']], ost: [
                    { name: 'The Realm Within', youtubeUrl: 'https://www.youtube.com/watch?v=EfD-zFe26CU', spotifyUrl: 'https://open.spotify.com/track/6dMi6WV6MfCH75oWJA3bgi?si=0d676844b16146a6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            }
        ],
        backgroundImage: 'Lisha.jpg',
        subRegions: {
            "Dunyu Ruins": {
                name: 'Dunyu Ruins',
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Linger in the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=JEuCuQ6zy30', spotifyUrl: 'https://open.spotify.com/track/11Ij6lmOZM79RC15ZTHUZi?si=167aa83701ba490a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Slumbering Lore', youtubeUrl: 'https://www.youtube.com/watch?v=hk0MXq8HaoQ', spotifyUrl: 'https://open.spotify.com/track/5Ffqv3nxK2C4BbDEMr6uJN?si=19e665e83f5d4448', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Silent Ruins', youtubeUrl: 'https://www.youtube.com/watch?v=vGM68dedb0A', spotifyUrl: 'https://open.spotify.com/track/3Vn5vcFVQ0rW49tJJNw3pP?si=bc11d6ed832d4b68', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lone Drifter', youtubeUrl: 'https://www.youtube.com/watch?v=gQ-ITVNfrXg', spotifyUrl: 'https://open.spotify.com/track/5wUWqJwMCMUN3IRWxZ9xbI?si=807eae1d334c436e', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lost Expectation', youtubeUrl: 'https://www.youtube.com/watch?v=YRNrzV-WHMQ', spotifyUrl: 'https://open.spotify.com/track/2n0QsS6GAD7GUoKZ5rONNF?si=0760656a3b754176', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'DunyuRuins.jpg'
            },
            "Lingju Pass": {
                name: "Lingju Pass",
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Linger in the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=JEuCuQ6zy30', spotifyUrl: 'https://open.spotify.com/track/11Ij6lmOZM79RC15ZTHUZi?si=167aa83701ba490a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Slumbering Lore', youtubeUrl: 'https://www.youtube.com/watch?v=hk0MXq8HaoQ', spotifyUrl: 'https://open.spotify.com/track/5Ffqv3nxK2C4BbDEMr6uJN?si=19e665e83f5d4448', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Silent Ruins', youtubeUrl: 'https://www.youtube.com/watch?v=vGM68dedb0A', spotifyUrl: 'https://open.spotify.com/track/3Vn5vcFVQ0rW49tJJNw3pP?si=bc11d6ed832d4b68', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lone Drifter', youtubeUrl: 'https://www.youtube.com/watch?v=gQ-ITVNfrXg', spotifyUrl: 'https://open.spotify.com/track/5wUWqJwMCMUN3IRWxZ9xbI?si=807eae1d334c436e', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lost Expectation', youtubeUrl: 'https://www.youtube.com/watch?v=YRNrzV-WHMQ', spotifyUrl: 'https://open.spotify.com/track/2n0QsS6GAD7GUoKZ5rONNF?si=0760656a3b754176', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'LingjuPass.jpg'
            },
            "Qingxu Pool": {
                name: "Qingxu Pool",
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Linger in the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=JEuCuQ6zy30', spotifyUrl: 'https://open.spotify.com/track/11Ij6lmOZM79RC15ZTHUZi?si=167aa83701ba490a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Slumbering Lore', youtubeUrl: 'https://www.youtube.com/watch?v=hk0MXq8HaoQ', spotifyUrl: 'https://open.spotify.com/track/5Ffqv3nxK2C4BbDEMr6uJN?si=19e665e83f5d4448', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Silent Ruins', youtubeUrl: 'https://www.youtube.com/watch?v=vGM68dedb0A', spotifyUrl: 'https://open.spotify.com/track/3Vn5vcFVQ0rW49tJJNw3pP?si=bc11d6ed832d4b68', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lone Drifter', youtubeUrl: 'https://www.youtube.com/watch?v=gQ-ITVNfrXg', spotifyUrl: 'https://open.spotify.com/track/5wUWqJwMCMUN3IRWxZ9xbI?si=807eae1d334c436e', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Lost Expectation', youtubeUrl: 'https://www.youtube.com/watch?v=YRNrzV-WHMQ', spotifyUrl: 'https://open.spotify.com/track/2n0QsS6GAD7GUoKZ5rONNF?si=0760656a3b754176', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'QingxuPool.jpg'
            },
        }
    },
    "Sea of Clouds": {
        name: 'Sea of Clouds',
        conditions: [
            {
                conditions: [['clear sky']], ost: [
                    { name: "Maiden's Longing", youtubeUrl: 'https://www.youtube.com/watch?v=KLy9NXUr_Iw', spotifyUrl: 'https://open.spotify.com/track/2n2vIuYG7G8ATgjM4sY4VQ?si=201475482734451d', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Clear Sky Over Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=P5lgF-OmqC4', spotifyUrl: 'https://open.spotify.com/track/2ceLH0wzOEY4mCBC3xAPpt?si=9730368149b3440c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Gentle Rain', spotifyUrl: 'https://www.youtube.com/watch?v=EwFg3j8ji5o', spotifyUrl: 'https://open.spotify.com/track/0o61nzWJim6WTIgTXNYlJ5?si=529f9efbb4ef46aa', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Rhythms From the Conch', youtubeUrl: 'https://www.youtube.com/watch?v=TSVb8qOmx7g', spotifyUrl: 'https://open.spotify.com/track/4nnBJo7j1PBDK6V8DnW0oj?si=d664a39d73c54168', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Flickering Petals', youtubeUrl: 'https://www.youtube.com/watch?v=Ty0rDWq2Bm8', spotifyUrl: 'https://open.spotify.com/track/13EOLLe5BZMrb6lZY0xRIt?si=77213bc19e564d09', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['rain']], ost: [
                    { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            }
        ],
        backgroundImage: 'SeaOfClouds.jpg',
        subRegions: {
            "Liyue Harbor": {
                name: 'Liyue Harbor',
                conditions: [
                    {
                        conditions: [['day']], ost: [
                            { name: 'Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=d5MrlIKlDno', spotifyUrl: 'https://open.spotify.com/track/0JobBuLW1W123TWkwl6nwu?si=b028058a397e498f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: "Moon in One's Cup", youtubeUrl: 'https://www.youtube.com/watch?v=6k21sSDavWU', spotifyUrl: 'https://open.spotify.com/track/5xuPYYd4OAETyttCreFJzd?si=4e531b0a96b946a4', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night']], ost: [
                            { name: 'Sun Rises in Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=2ve5QNy1nq4', spotifyUrl: 'https://open.spotify.com/track/6QiNsBfRVrlHMROB6vgaIx?si=289715f83b774090', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Call It a Day in Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=6DhnS0OANhQ', spotifyUrl: 'https://open.spotify.com/track/1GC1sVLUrusMTygF5aA4od?si=279186cc940a46a9', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Clear Sky Over Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=P5lgF-OmqC4', spotifyUrl: 'https://open.spotify.com/track/2ceLH0wzOEY4mCBC3xAPpt?si=7692871d9d2e497b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['dusk']], ost: [
                            { name: 'Relaxation In Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=nfnYq__q1a0', spotifyUrl: 'https://open.spotify.com/track/0lAK7TqIFEcvW1HFAAAo5I?si=80f9da147d5944b9', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['dawn']], ost: [
                            { name: 'Good Night, Liyue', youtubeUrl: 'https://www.youtube.com/watch?v=fgz_ZwwezJY', spotifyUrl: 'https://open.spotify.com/track/38wUUUqMNEQ6CoA02Uy6Iv?si=5dc06d1a1264422e', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['domain']], ost: [
                            { name: 'A Transparent Moon', youtubeUrl: 'https://www.youtube.com/watch?v=c4nvD32HjBA', spotifyUrl: 'https://open.spotify.com/track/7z7wd71ipTp0SV12oujOiK?si=86d99bdcb2d4467d', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Treasury From the Northland', youtubeUrl: 'https://www.youtube.com/watch?v=GcxQhPZOCe0', spotifyUrl: 'https://open.spotify.com/track/6xSVl7BeACvTpb6DQIWzQu?si=97925ca5dab444e9', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Sanctuary for the Sick', youtubeUrl: 'https://www.youtube.com/watch?v=J0ct9dRcdmo', spotifyUrl: 'https://open.spotify.com/track/1dIGxUaLv83yOO7arGdaHt?si=4b441142493b437f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'The Realm Within', youtubeUrl: 'https://www.youtube.com/watch?v=EfD-zFe26CU', spotifyUrl: 'https://open.spotify.com/track/6dMi6WV6MfCH75oWJA3bgi?si=0d676844b16146a6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                ],
                backgroundImage: 'LiyueHarbor.jpg'
            },
            "Guyun Stone Forest": {
                name: 'Guyun Stone Forest',
                conditions: [
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Gentle Rain', youtubeUrl: 'https://www.youtube.com/watch?v=EwFg3j8ji5o', spotifyUrl: 'https://open.spotify.com/track/0o61nzWJim6WTIgTXNYlJ5?si=529f9efbb4ef46aa', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Scattered Amongst the Tides', youtubeUrl: 'https://www.youtube.com/watch?v=eFSKIMKk4UM', spotifyUrl: 'https://open.spotify.com/track/4gxAxQScUpwnCtCnM4Y1Uv?si=8770c8ebc5124c3b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'This Little Light of Mine', youtubeUrl: 'https://www.youtube.com/watch?v=gYdqTT_41Ow', spotifyUrl: 'https://open.spotify.com/track/754RikKVwjxtUckRWJu6B0?si=8ae02294295c4c31', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Legend of Redemption', youtubeUrl: 'https://www.youtube.com/watch?v=4cq9TfyuYdM', spotifyUrl: 'https://open.spotify.com/track/4DJUmeLAINsXyaFtoJjdUa?si=9dd056f95fb146a7', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Another Hopeful Tomorrow', youtubeUrl: 'https://www.youtube.com/watch?v=x6jUyKT8Sto', spotifyUrl: 'https://open.spotify.com/track/2mrb4EhwdH1pcYUCPR73oa?si=5ac5992e4b5a4ca0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'GuyunStoneForest.jpg'
            }
        }
    },
    "Qiongji Estuary": {
        name: 'Qiongji Estuary',
        conditions: [
            {
                conditions: [['day', 'sunny']], ost: [
                    { name: 'Joy of Returning', youtubeUrl: 'https://www.youtube.com/watch?v=TTjAxOgLztU', spotifyUrl: 'https://open.spotify.com/track/5668rYVLBARZyimuWdnsyc?si=9cbd80e2884f4442', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Foxes at Play', youtubeUrl: 'https://www.youtube.com/watch?v=bP4ggdfBtDg', spotifyUrl: 'https://open.spotify.com/track/4VV2BW1lECad0w3xmyyRBg?si=c83bbb4cee3f43ec', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['clear sky']], ost: [
                    { name: "Loner's Departure", youtubeUrl: 'https://www.youtube.com/watch?v=pmD8NNyeZl4', spotifyUrl: 'https://open.spotify.com/track/2yndV24ZMPKEvYioMKhHAQ?si=c0db361f2c0440c3', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Plain of Nostalgia', youtubeUrl: 'https://www.youtube.com/watch?v=lbsJ6M-dn9c', spotifyUrl: 'https://open.spotify.com/track/5JS9RQZ8urxL87nVqsEy7v?si=d567e9367e1b4127', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['night', 'clear sky']], ost: [
                    { name: 'Moss Covered Path', youtubeUrl: 'https://www.youtube.com/watch?v=ZJZowcJjFlI', spotifyUrl: 'https://open.spotify.com/track/6WpPD2gHRjuZvrrPaxgi6d?si=eb16f95587564fc1', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['rain']], ost: [
                    { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            }
        ],
        backgroundImage: 'QiongjiEstuary.jpg',
        subRegions: {
            "Mingyun Village": {
                name: 'Mingyun Village',
                conditions: [
                    {
                        conditions: [['any']], ost: [
                            { name: 'Moss Covered Path', youtubeUrl: 'https://www.youtube.com/watch?v=ZJZowcJjFlI', spotifyUrl: 'https://open.spotify.com/track/6WpPD2gHRjuZvrrPaxgi6d?si=eb16f95587564fc1', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'MingyunVillage.jpg'
            },
            "Yaoguang Shoal": {
                name: 'Yaoguang Shoal',
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Another Hopeful Tomorrow', youtubeUrl: 'https://www.youtube.com/watch?v=x6jUyKT8Sto', spotifyUrl: 'https://open.spotify.com/track/2mrb4EhwdH1pcYUCPR73oa?si=5ac5992e4b5a4ca0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['clear sky']], ost: [
                            { name: 'Hazy Light', youtubeUrl: 'https://www.youtube.com/watch?v=Zgv8R04dH7E', spotifyUrl: 'https://open.spotify.com/track/2x980FiDbXV9Uytk3VJfip?si=79b9b47357bb4e0c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Scattered Amongst the Tides', youtubeUrl: 'https://www.youtube.com/watch?v=eFSKIMKk4UM', spotifyUrl: 'https://open.spotify.com/track/4gxAxQScUpwnCtCnM4Y1Uv?si=8770c8ebc5124c3b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'YaoguangShoal.jpg'
            },
            "Guili Plains": {
                name: 'Guili Plains',
                conditions: [
                    {
                        conditions: [['domain']], ost: [
                            { name: 'The Realm Within', youtubeUrl: 'https://www.youtube.com/watch?v=EfD-zFe26CU', spotifyUrl: 'https://open.spotify.com/track/6dMi6WV6MfCH75oWJA3bgi?si=0d676844b16146a6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'HuiliPlains.jpg'
            },
            "Luhua Pool": {
                name: 'Luhua Pool',
                conditions: [
                    {
                        conditions: [['clear sky']], ost: [
                            { name: 'Another Hopeful Tomorrow', youtubeUrl: 'https://www.youtube.com/watch?v=x6jUyKT8Sto', spotifyUrl: 'https://open.spotify.com/track/2mrb4EhwdH1pcYUCPR73oa?si=5ac5992e4b5a4ca0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Hazy Light', youtubeUrl: 'https://www.youtube.com/watch?v=Zgv8R04dH7E', spotifyUrl: 'https://open.spotify.com/track/2x980FiDbXV9Uytk3VJfip?si=79b9b47357bb4e0c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Scattered Amongst the Tides', youtubeUrl: 'https://www.youtube.com/watch?v=eFSKIMKk4UM', spotifyUrl: 'https://open.spotify.com/track/4gxAxQScUpwnCtCnM4Y1Uv?si=8770c8ebc5124c3b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['domain']], ost: [
                            { name: 'The Realm Within', youtubeUrl: 'https://www.youtube.com/watch?v=EfD-zFe26CU', spotifyUrl: 'https://open.spotify.com/track/6dMi6WV6MfCH75oWJA3bgi?si=0d676844b16146a6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'LuhuaPool.jpg'
            }
        }
    },
    "Bishui Plain": {
        name: 'Bishui Plain',
        conditions: [
            {
                conditions: [['any']], ost: [
                    { name: 'Winding River', youtubeUrl: 'https://www.youtube.com/watch?v=RV09JXgtsJw', spotifyUrl: 'https://open.spotify.com/track/35SoEGEXsaNnfi8PsT8xEC?si=ef69ba6bec3540d7', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Blossoms Across the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=8eH4vN4wgn0', spotifyUrl: 'https://open.spotify.com/track/5E5pYqNZqlRWYxr7OwQTQB?si=a07bdf8a9476494f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: ' Melodious Flute', youtubeUrl: 'https://www.youtube.com/watch?v=kiQIUKYdVfo', spotifyUrl: 'https://open.spotify.com/track/2yK5MUkSDKlmtglXrOEU7I?si=665d37a476134382', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Vague Whispers', youtubeUrl: 'https://www.youtube.com/watch?v=VNBmCln8m6s', spotifyUrl: 'https://open.spotify.com/track/2XLG1ZwKkG9UUfDMjuwAeH?si=2856b5f4839a4189', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['day', 'sunny']], ost: [
                    { name: 'Mild Waves', youtubeUrl: 'https://www.youtube.com/watch?v=k--D5PIDt2Y', spotifyUrl: 'https://open.spotify.com/track/0CvE0nJBSZunRT4RKsjUxL?si=1d4b1823945d44b6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Rhythm Amidst the Reeds', youtubeUrl: 'https://www.youtube.com/watch?v=HcV-l5MEEJc', spotifyUrl: 'https://open.spotify.com/track/6fDtrqUmd9Seufl2hTli7P?si=9c6354a43c9944ba', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Flows of Jade-Like Water', youtubeUrl: 'https://www.youtube.com/watch?v=ZLRGsr17llc', spotifyUrl: 'https://open.spotify.com/track/3yNVoNAkXe3aUjkAaWthwU?si=f47f41afa04a4d7d', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Stroll in the Shadows', youtubeUrl: 'https://www.youtube.com/watch?v=ngoQ3pzat7I', spotifyUrl: 'https://open.spotify.com/track/3Dod8nDDtj2WGZ02w7uc3T?si=1e0a7c0759ee4f4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['night'], ['rain']], ost: [
                    { name: 'Flow of Mildness', youtubeUrl: 'https://www.youtube.com/watch?v=LrG3sjNqtfg', spotifyUrl: 'https://open.spotify.com/track/2hI5tToSrWSBRJUfsrvetx?si=99b144f730594c98', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Legends Swept Away', youtubeUrl: 'https://www.youtube.com/watch?v=-ZqthCkVluo', spotifyUrl: 'https://open.spotify.com/track/0AT8UeyDydzBKrhCcQGQew?si=6ebede0b2dae4747', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['domain']], ost: [
                    { name: 'Humming Amidst Rocks', youtubeUrl: 'https://www.youtube.com/watch?v=tzaJaCtBnDU', spotifyUrl: 'https://open.spotify.com/track/7rNi6aLecOfHGdVW8iUWo1?si=45e36763c02e4f3f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            }
        ],
        backgroundImage: 'BishuiPlain.jpg',
        subRegions: {
            "Dihua Marsh": {
                name: 'Dihua Marsh',
                conditions: [
                    {
                        conditions: [['any']], ost: [
                            { name: 'Winding River', youtubeUrl: 'https://www.youtube.com/watch?v=RV09JXgtsJw', spotifyUrl: 'https://open.spotify.com/track/35SoEGEXsaNnfi8PsT8xEC?si=ef69ba6bec3540d7', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Blossoms Across the Valley', youtubeUrl: 'https://www.youtube.com/watch?v=8eH4vN4wgn0', spotifyUrl: 'https://open.spotify.com/track/5E5pYqNZqlRWYxr7OwQTQB?si=a07bdf8a9476494f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: ' Melodious Flute', youtubeUrl: 'https://www.youtube.com/watch?v=kiQIUKYdVfo', spotifyUrl: 'https://open.spotify.com/track/2yK5MUkSDKlmtglXrOEU7I?si=665d37a476134382', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Vague Whispers', youtubeUrl: 'https://www.youtube.com/watch?v=VNBmCln8m6s', spotifyUrl: 'https://open.spotify.com/track/2XLG1ZwKkG9UUfDMjuwAeH?si=2856b5f4839a4189', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Mild Waves', youtubeUrl: 'https://www.youtube.com/watch?v=k--D5PIDt2Y', spotifyUrl: 'https://open.spotify.com/track/0CvE0nJBSZunRT4RKsjUxL?si=1d4b1823945d44b6', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rhythm Amidst the Reeds', youtubeUrl: 'https://www.youtube.com/watch?v=HcV-l5MEEJc', spotifyUrl: 'https://open.spotify.com/track/6fDtrqUmd9Seufl2hTli7P?si=9c6354a43c9944ba', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Flows of Jade-Like Water', youtubeUrl: 'https://www.youtube.com/watch?v=ZLRGsr17llc', spotifyUrl: 'https://open.spotify.com/track/3yNVoNAkXe3aUjkAaWthwU?si=f47f41afa04a4d7d', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Stroll in the Shadows', youtubeUrl: 'https://www.youtube.com/watch?v=ngoQ3pzat7I', spotifyUrl: 'https://open.spotify.com/track/3Dod8nDDtj2WGZ02w7uc3T?si=1e0a7c0759ee4f4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Flow of Mildness', youtubeUrl: 'https://www.youtube.com/watch?v=LrG3sjNqtfg', spotifyUrl: 'https://open.spotify.com/track/2hI5tToSrWSBRJUfsrvetx?si=99b144f730594c98', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Legends Swept Away', youtubeUrl: 'https://www.youtube.com/watch?v=-ZqthCkVluo', spotifyUrl: 'https://open.spotify.com/track/0AT8UeyDydzBKrhCcQGQew?si=6ebede0b2dae4747', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['domain']], ost: [
                            { name: 'Humming Amidst Rocks', youtubeUrl: 'https://www.youtube.com/watch?v=tzaJaCtBnDU', spotifyUrl: 'https://open.spotify.com/track/7rNi6aLecOfHGdVW8iUWo1?si=45e36763c02e4f3f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ]
            },
            "Sal Terrae": {
                name: 'Sal Terrae',
                conditions: [
                    {
                        conditions: [['any']], ost: [
                            { name: 'Another Hopeful Tomorrow', youtubeUrl: 'https://www.youtube.com/watch?v=x6jUyKT8Sto', spotifyUrl: 'https://open.spotify.com/track/2mrb4EhwdH1pcYUCPR73oa?si=5ac5992e4b5a4ca0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'This Little Light of Mine', youtubeUrl: 'https://www.youtube.com/watch?v=gYdqTT_41Ow', spotifyUrl: 'https://open.spotify.com/track/754RikKVwjxtUckRWJu6B0?si=8ae02294295c4c31', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Legend of Redemption', youtubeUrl: 'https://www.youtube.com/watch?v=4cq9TfyuYdM', spotifyUrl: 'https://open.spotify.com/track/4DJUmeLAINsXyaFtoJjdUa?si=9dd056f95fb146a7', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Scattered Amongst the Tides', youtubeUrl: 'https://www.youtube.com/watch?v=eFSKIMKk4UM', spotifyUrl: 'https://open.spotify.com/track/4gxAxQScUpwnCtCnM4Y1Uv?si=8770c8ebc5124c3b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'SalTerrae.jpg'
            },
            "Stone Gate": {
                name: 'Stone Gate',
                conditions: [
                    {
                        conditions: [['any']], ost: [
                            { name: 'Gentle Rain', spotifyUrl: 'https://www.youtube.com/watch?v=EwFg3j8ji5o', spotifyUrl: 'https://open.spotify.com/track/0o61nzWJim6WTIgTXNYlJ5?si=529f9efbb4ef46aa', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Vague Whispers', youtubeUrl: 'https://www.youtube.com/watch?v=VNBmCln8m6s', spotifyUrl: 'https://open.spotify.com/track/2XLG1ZwKkG9UUfDMjuwAeH?si=2856b5f4839a4189', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'StoneGate.jpg'
            },
            "Wuwang Hill": {
                name: 'Wuwang Hill',
                conditions: [
                    {
                        conditions: [['any']], ost: [
                            { name: 'Humming Amidst Rocks', youtubeUrl: 'https://www.youtube.com/watch?v=tzaJaCtBnDU', spotifyUrl: 'https://open.spotify.com/track/7rNi6aLecOfHGdVW8iUWo1?si=45e36763c02e4f3f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['domain']], ost: [
                            { name: 'Red Leaf on the Chessboard', youtubeUrl: 'https://www.youtube.com/watch?v=3F_aCU_v1_g', spotifyUrl: 'https://open.spotify.com/track/0ko4YyVbv7ySlzqy8iKdpy?si=4088733011004446', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'WuwangHill.jpg'
            },
            "Qingce Village": {
                name: 'Qingce Village',
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Peaceful Hike', youtubeUrl: 'https://www.youtube.com/watch?v=TCRlphio-2o', spotifyUrl: 'https://open.spotify.com/track/2FCatAh7hqYxbTbuZgWhWx?si=fe6773bbe78a4e9f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'The Fading Stories', youtubeUrl: 'https://www.youtube.com/watch?v=IvMxXeJrq3Y', spotifyUrl: 'https://open.spotify.com/track/1iJL4eeKUbRuQDGO7hVRCI?si=faaa70b3cc014867', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'QingceVillage.jpg'
            }
        }
    },
    "Minlin": {
        name: 'Minlin',
        conditions: [
            {
                conditions: [['clear sky']], ost: [
                    { name: 'Plain of Nostalgia', youtubeUrl: 'https://www.youtube.com/watch?v=lbsJ6M-dn9c', spotifyUrl: 'https://open.spotify.com/track/5JS9RQZ8urxL87nVqsEy7v?si=48d09f9cc48b412a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: "Adeptus' Solace", youtubeUrl: 'https://www.youtube.com/watch?v=Mi4Mjezm3Os', spotifyUrl: 'https://open.spotify.com/track/0h7jrdRdNBclcJruULyNwC?si=40ea168bcba54ede', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Emerging Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=GG0aczBNQZc', spotifyUrl: 'https://open.spotify.com/track/7wCBY8lpveoheSO7FXVsw5?si=b3b89693e2584bd2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                    { name: 'Drink With a Hermit', youtubeUrl: 'https://www.youtube.com/watch?v=9zkCxxO4DL8', spotifyUrl: 'https://open.spotify.com/track/2UuZB5dZTjmJA5I6zZsHTJ?si=28d76575229e40c4' }
                ]
            },
            {
                conditions: [['day', 'sunny']], ost: [
                    { name: 'Red Leaf on the Chessboard', youtubeUrl: 'https://www.youtube.com/watch?v=3F_aCU_v1_g', spotifyUrl: 'https://open.spotify.com/track/0ko4YyVbv7ySlzqy8iKdpy?si=4088733011004446', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            },
            {
                conditions: [['rain']], ost: [
                    { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                ]
            }
        ],
        backgroundImage: 'Minlin.jpg',
        subRegions: {
            "Mt. Aocang": {
                name: 'Mt. Aocang',
                conditions: [
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Above the Sea of Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=LsgOFBdHNF8', spotifyUrl: 'https://open.spotify.com/track/6qLo4GQMmyrZwOQSzmUqpr?si=b85985e1454c425f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Casual Visit', youtubeUrl: 'https://www.youtube.com/watch?v=gE976747Luo', spotifyUrl: 'https://open.spotify.com/track/7qpnskDLf5FFXVnNldbXeo?si=a27facb22ef94a52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'The Absence of Adepti', youtubeUrl: 'https://www.youtube.com/watch?v=L2RYUKGZSOM', spotifyUrl: 'https://open.spotify.com/track/2yXkLHAVOgs7iJbrFdMUeF?si=d3b0dedaedde4d6b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Bird Call From Afar', youtubeUrl: 'https://www.youtube.com/watch?v=WfVxhwV93UA', spotifyUrl: 'https://open.spotify.com/track/7dAtlQXFqb4QVjl712qVB5?si=b9d537809ba24f52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: "Adeptus' Retirement", youtubeUrl: 'https://www.youtube.com/watch?v=RyVIJIK9kys', spotifyUrl: 'https://open.spotify.com/track/4afVwyGCeYDYYDM5RABNLA?si=dbfd4c39a34b4feb', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Serendipitous Encounter', youtubeUrl: 'https://www.youtube.com/watch?v=pxv3oLI8s1s', spotifyUrl: 'https://open.spotify.com/track/3kdnGNISjQ8vstmQmx8uaH?si=e1dacfb42ba84285', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rays of Sunlight', youtubeUrl: 'https://www.youtube.com/watch?v=XsqRNnricPg', spotifyUrl: 'https://open.spotify.com/track/5U8IasUSA4EOmZwCzKyhcm?si=4df24ec0a5d84cd0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rainbow at Summit', youtubeUrl: 'https://www.youtube.com/watch?v=oPcAMkC9Pv4', spotifyUrl: 'https://open.spotify.com/track/3PRjDoSa5cksLtv68elXvl?si=e515c5120b104c19', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Spring in Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=TSvxRRq-bBE', spotifyUrl: 'https://open.spotify.com/track/1MpGEvFfnWxByjfwydE1kP?si=d4f832983d8046e8', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Freedom of Crane', youtubeUrl: 'https://www.youtube.com/watch?v=F1EZgg_pMOA', spotifyUrl: 'https://open.spotify.com/track/5ZsJSODoKuxBxHwf0YXNo4?si=ec15b20326304dda', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'MtAocang.jpg'
            },
            "Huaguang Stone Forest": {
                name: 'Huaguang Stone Forest',
                conditions: [
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Wandering Flight', youtubeUrl: 'https://www.youtube.com/watch?v=Np91Z2_7GCw', spotifyUrl: 'https://open.spotify.com/track/6v4biNJNbzsZ1s4Znlshhi?si=fb2b54de353e4bd9', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Faint Tracks', youtubeUrl: 'https://www.youtube.com/watch?v=OanZ8vhOMY8', spotifyUrl: 'https://open.spotify.com/track/0U4LMNasBhZtLB2iBFHnY8?si=32d468439beb4cb2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Idle Away From Mountains', youtubeUrl: 'https://www.youtube.com/watch?v=cRVk_MkW6ZE', spotifyUrl: 'https://open.spotify.com/track/1jR61nc98OPr6B1kBtKP1t?si=b369902bcedb4306', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Emerging Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=GG0aczBNQZc', spotifyUrl: 'https://open.spotify.com/track/7wCBY8lpveoheSO7FXVsw5?si=b3b89693e2584bd2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Humming Amidst Rocks', youtubeUrl: 'https://www.youtube.com/watch?v=tzaJaCtBnDU', spotifyUrl: 'https://open.spotify.com/track/7rNi6aLecOfHGdVW8iUWo1?si=45e36763c02e4f3f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'HuaguangStoneForest.jpg'
            },
            "Qingyun Peak": {
                name: 'Qingyun Peak',
                conditions: [
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Above the Sea of Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=LsgOFBdHNF8', spotifyUrl: 'https://open.spotify.com/track/6qLo4GQMmyrZwOQSzmUqpr?si=b85985e1454c425f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Casual Visit', youtubeUrl: 'https://www.youtube.com/watch?v=gE976747Luo', spotifyUrl: 'https://open.spotify.com/track/7qpnskDLf5FFXVnNldbXeo?si=a27facb22ef94a52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'The Absence of Adepti', youtubeUrl: 'https://www.youtube.com/watch?v=L2RYUKGZSOM', spotifyUrl: 'https://open.spotify.com/track/2yXkLHAVOgs7iJbrFdMUeF?si=d3b0dedaedde4d6b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Bird Call From Afar', youtubeUrl: 'https://www.youtube.com/watch?v=WfVxhwV93UA', spotifyUrl: 'https://open.spotify.com/track/7dAtlQXFqb4QVjl712qVB5?si=b9d537809ba24f52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: "Adeptus' Retirement", youtubeUrl: 'https://www.youtube.com/watch?v=RyVIJIK9kys', spotifyUrl: 'https://open.spotify.com/track/4afVwyGCeYDYYDM5RABNLA?si=dbfd4c39a34b4feb', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Serendipitous Encounter', youtubeUrl: 'https://www.youtube.com/watch?v=pxv3oLI8s1s', spotifyUrl: 'https://open.spotify.com/track/3kdnGNISjQ8vstmQmx8uaH?si=e1dacfb42ba84285', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rays of Sunlight', youtubeUrl: 'https://www.youtube.com/watch?v=XsqRNnricPg', spotifyUrl: 'https://open.spotify.com/track/5U8IasUSA4EOmZwCzKyhcm?si=4df24ec0a5d84cd0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rainbow at Summit', youtubeUrl: 'https://www.youtube.com/watch?v=oPcAMkC9Pv4', spotifyUrl: 'https://open.spotify.com/track/3PRjDoSa5cksLtv68elXvl?si=e515c5120b104c19', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Spring in Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=TSvxRRq-bBE', spotifyUrl: 'https://open.spotify.com/track/1MpGEvFfnWxByjfwydE1kP?si=d4f832983d8046e8', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Freedom of Crane', youtubeUrl: 'https://www.youtube.com/watch?v=F1EZgg_pMOA', spotifyUrl: 'https://open.spotify.com/track/5ZsJSODoKuxBxHwf0YXNo4?si=ec15b20326304dda', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'QingyunPeak.jpg'
            },
            "Mt. Hulao": {
                name: 'Mt. Hulao',
                conditions: [
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Above the Sea of Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=LsgOFBdHNF8', spotifyUrl: 'https://open.spotify.com/track/6qLo4GQMmyrZwOQSzmUqpr?si=b85985e1454c425f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Casual Visit', youtubeUrl: 'https://www.youtube.com/watch?v=gE976747Luo', spotifyUrl: 'https://open.spotify.com/track/7qpnskDLf5FFXVnNldbXeo?si=a27facb22ef94a52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'The Absence of Adepti', youtubeUrl: 'https://www.youtube.com/watch?v=L2RYUKGZSOM', spotifyUrl: 'https://open.spotify.com/track/2yXkLHAVOgs7iJbrFdMUeF?si=d3b0dedaedde4d6b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Bird Call From Afar', youtubeUrl: 'https://www.youtube.com/watch?v=WfVxhwV93UA', spotifyUrl: 'https://open.spotify.com/track/7dAtlQXFqb4QVjl712qVB5?si=b9d537809ba24f52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: "Adeptus' Retirement", youtubeUrl: 'https://www.youtube.com/watch?v=RyVIJIK9kys', spotifyUrl: 'https://open.spotify.com/track/4afVwyGCeYDYYDM5RABNLA?si=dbfd4c39a34b4feb', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Serendipitous Encounter', youtubeUrl: 'https://www.youtube.com/watch?v=pxv3oLI8s1s', spotifyUrl: 'https://open.spotify.com/track/3kdnGNISjQ8vstmQmx8uaH?si=e1dacfb42ba84285', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rays of Sunlight', youtubeUrl: 'https://www.youtube.com/watch?v=XsqRNnricPg', spotifyUrl: 'https://open.spotify.com/track/5U8IasUSA4EOmZwCzKyhcm?si=4df24ec0a5d84cd0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rainbow at Summit', youtubeUrl: 'https://www.youtube.com/watch?v=oPcAMkC9Pv4', spotifyUrl: 'https://open.spotify.com/track/3PRjDoSa5cksLtv68elXvl?si=e515c5120b104c19', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Spring in Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=TSvxRRq-bBE', spotifyUrl: 'https://open.spotify.com/track/1MpGEvFfnWxByjfwydE1kP?si=d4f832983d8046e8', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Freedom of Crane', youtubeUrl: 'https://www.youtube.com/watch?v=F1EZgg_pMOA', spotifyUrl: 'https://open.spotify.com/track/5ZsJSODoKuxBxHwf0YXNo4?si=ec15b20326304dda', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'MtHulao.jpg'
            },
            "Nantianmen": {
                name: 'Nantianmen',
                conditions: [
                    {
                        conditions: [['night'], ['rain']], ost: [
                            { name: 'Above the Sea of Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=LsgOFBdHNF8', spotifyUrl: 'https://open.spotify.com/track/6qLo4GQMmyrZwOQSzmUqpr?si=b85985e1454c425f', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Casual Visit', youtubeUrl: 'https://www.youtube.com/watch?v=gE976747Luo', spotifyUrl: 'https://open.spotify.com/track/7qpnskDLf5FFXVnNldbXeo?si=a27facb22ef94a52', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'The Absence of Adepti', youtubeUrl: 'https://www.youtube.com/watch?v=L2RYUKGZSOM', spotifyUrl: 'https://open.spotify.com/track/2yXkLHAVOgs7iJbrFdMUeF?si=d3b0dedaedde4d6b', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: "Adeptus' Retirement", youtubeUrl: 'https://www.youtube.com/watch?v=RyVIJIK9kys', spotifyUrl: 'https://open.spotify.com/track/4afVwyGCeYDYYDM5RABNLA?si=dbfd4c39a34b4feb', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'A Serendipitous Encounter', youtubeUrl: 'https://www.youtube.com/watch?v=pxv3oLI8s1s', spotifyUrl: 'https://open.spotify.com/track/3kdnGNISjQ8vstmQmx8uaH?si=e1dacfb42ba84285', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rays of Sunlight', youtubeUrl: 'https://www.youtube.com/watch?v=XsqRNnricPg', spotifyUrl: 'https://open.spotify.com/track/5U8IasUSA4EOmZwCzKyhcm?si=4df24ec0a5d84cd0', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Rainbow at Summit', youtubeUrl: 'https://www.youtube.com/watch?v=oPcAMkC9Pv4', spotifyUrl: 'https://open.spotify.com/track/3PRjDoSa5cksLtv68elXvl?si=e515c5120b104c19', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Spring in Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=TSvxRRq-bBE', spotifyUrl: 'https://open.spotify.com/track/1MpGEvFfnWxByjfwydE1kP?si=d4f832983d8046e8', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['any']], ost: [
                            { name: 'Freedom of Crane', youtubeUrl: 'https://www.youtube.com/watch?v=F1EZgg_pMOA', spotifyUrl: 'https://open.spotify.com/track/5ZsJSODoKuxBxHwf0YXNo4?si=ec15b20326304dda', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ],
                backgroundImage: 'Nantianmen.jpg'
            },
            "Tianqiu Valley": {
                name: 'Tianqiu Valley',
                conditions: [
                    {
                        conditions: [['clear sky']], ost: [
                            { name: 'Plain of Nostalgia', youtubeUrl: 'https://www.youtube.com/watch?v=lbsJ6M-dn9c', spotifyUrl: 'https://open.spotify.com/track/5JS9RQZ8urxL87nVqsEy7v?si=48d09f9cc48b412a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: "Adeptus' Solace", youtubeUrl: 'https://www.youtube.com/watch?v=Mi4Mjezm3Os', spotifyUrl: 'https://open.spotify.com/track/0h7jrdRdNBclcJruULyNwC?si=40ea168bcba54ede', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Emerging Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=GG0aczBNQZc', spotifyUrl: 'https://open.spotify.com/track/7wCBY8lpveoheSO7FXVsw5?si=b3b89693e2584bd2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Drink With a Hermit', youtubeUrl: 'https://www.youtube.com/watch?v=9zkCxxO4DL8', spotifyUrl: 'https://open.spotify.com/track/2UuZB5dZTjmJA5I6zZsHTJ?si=28d76575229e40c4' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Red Leaf on the Chessboard', youtubeUrl: 'https://www.youtube.com/watch?v=3F_aCU_v1_g', spotifyUrl: 'https://open.spotify.com/track/0ko4YyVbv7ySlzqy8iKdpy?si=4088733011004446', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['rain']], ost: [
                            { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ]
            },
            "Cuijue Slope": {
                name: "Cuijue Slope",
                conditions: [
                    {
                        conditions: [['clear sky']], ost: [
                            { name: 'Plain of Nostalgia', youtubeUrl: 'https://www.youtube.com/watch?v=lbsJ6M-dn9c', spotifyUrl: 'https://open.spotify.com/track/5JS9RQZ8urxL87nVqsEy7v?si=48d09f9cc48b412a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: "Adeptus' Solace", youtubeUrl: 'https://www.youtube.com/watch?v=Mi4Mjezm3Os', spotifyUrl: 'https://open.spotify.com/track/0h7jrdRdNBclcJruULyNwC?si=40ea168bcba54ede', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Emerging Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=GG0aczBNQZc', spotifyUrl: 'https://open.spotify.com/track/7wCBY8lpveoheSO7FXVsw5?si=b3b89693e2584bd2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Drink With a Hermit', youtubeUrl: 'https://www.youtube.com/watch?v=9zkCxxO4DL8', spotifyUrl: 'https://open.spotify.com/track/2UuZB5dZTjmJA5I6zZsHTJ?si=28d76575229e40c4' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Red Leaf on the Chessboard', youtubeUrl: 'https://www.youtube.com/watch?v=3F_aCU_v1_g', spotifyUrl: 'https://open.spotify.com/track/0ko4YyVbv7ySlzqy8iKdpy?si=4088733011004446', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['rain']], ost: [
                            { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ]
            },
            "Jueyun Karst": {
                name: "Jueyun Karst",
                conditions: [
                    {
                        conditions: [['clear sky']], ost: [
                            { name: 'Plain of Nostalgia', youtubeUrl: 'https://www.youtube.com/watch?v=lbsJ6M-dn9c', spotifyUrl: 'https://open.spotify.com/track/5JS9RQZ8urxL87nVqsEy7v?si=48d09f9cc48b412a', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: "Adeptus' Solace", youtubeUrl: 'https://www.youtube.com/watch?v=Mi4Mjezm3Os', spotifyUrl: 'https://open.spotify.com/track/0h7jrdRdNBclcJruULyNwC?si=40ea168bcba54ede', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Emerging Clouds', youtubeUrl: 'https://www.youtube.com/watch?v=GG0aczBNQZc', spotifyUrl: 'https://open.spotify.com/track/7wCBY8lpveoheSO7FXVsw5?si=b3b89693e2584bd2', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' },
                            { name: 'Drink With a Hermit', youtubeUrl: 'https://www.youtube.com/watch?v=9zkCxxO4DL8', spotifyUrl: 'https://open.spotify.com/track/2UuZB5dZTjmJA5I6zZsHTJ?si=28d76575229e40c4' }
                        ]
                    },
                    {
                        conditions: [['day', 'sunny']], ost: [
                            { name: 'Red Leaf on the Chessboard', youtubeUrl: 'https://www.youtube.com/watch?v=3F_aCU_v1_g', spotifyUrl: 'https://open.spotify.com/track/0ko4YyVbv7ySlzqy8iKdpy?si=4088733011004446', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    },
                    {
                        conditions: [['rain']], ost: [
                            { name: 'Secluded Sanctuary', youtubeUrl: 'https://www.youtube.com/watch?v=MratXajnczU', spotifyUrl: 'https://open.spotify.com/track/7KhytPM9AUTun2nGXGP3iY?si=413f30f7fba84d4c', albumImage: 'Jade_Moon_Upon_a_Sea_of_Clouds.webp' }
                        ]
                    }
                ]
            }
        }
    }
}

// Zoom function
svg.addEventListener('wheel', function (event) {
    event.preventDefault();
    const mouseX = event.clientX - svg.getBoundingClientRect().left;
    const mouseY = event.clientY - svg.getBoundingClientRect().top;

    const zoomFactor = 0.025; // Adjust zoom sensitivity
    let newScale = event.deltaY < 0 ? scale * (1 + zoomFactor) : scale * (1 - zoomFactor);

    // Apply min and max scale limits
    newScale = Math.min(Math.max(newScale, minScale), maxScale);

    const zoomedX = (mouseX - originX * scale) / scale;
    const zoomedY = (mouseY - originY * scale) / scale;

    originX = (mouseX - zoomedX * newScale) / newScale;
    originY = (mouseY - zoomedY * newScale) / newScale;

    scale = newScale;
    mapGroup.setAttribute('transform', `translate(${originX}, ${originY}) scale(${scale})`);
});

// Dragging function
svg.addEventListener('mousedown', function (event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
});

svg.addEventListener('mouseup', function () {
    isDragging = false;
});

svg.addEventListener('mouseleave', function () {
    isDragging = false;
});

svg.addEventListener('mousemove', function (event) {
    if (isDragging) {
        const dx = (event.clientX - startX) * dragSensitivity; // Apply drag sensitivity
        const dy = (event.clientY - startY) * dragSensitivity;

        // Update origin based on drag
        originX += dx / scale; // Adjust origin based on scale
        originY += dy / scale;

        // Get SVG dimensions
        const svgWidth = svg.clientWidth;
        const svgHeight = svg.clientHeight;

        // Calculate map dimensions based on scale
        const bbox = mapGroup.getBBox();
        const mapWidth = bbox.width * scale;
        const mapHeight = bbox.height * scale;

        // Debugging prints
        console.log("SVG Width: " + svgWidth);
        console.log("SVG Height: " + svgHeight);
        console.log("Map Width: " + mapWidth);
        console.log("Map Height: " + mapHeight);
        console.log("BBox: ", bbox);

        // Calculate the min and max origin values to prevent dragging out of the SVG
        const minX = mapWidth; // Minimum X value
        const minY = mapHeight; // Minimum Y value
        const maxX = 0; // Maximum X value (no dragging right)
        const maxY = 0; // Maximum Y value (no dragging down)

        console.log("Min X: " + minX);
        console.log("Min Y: " + minY);

        // Clamp originX and originY to prevent dragging out of the SVG
        // originX = Math.max(minX, Math.min(originX, maxX));
        // originY = Math.max(minY, Math.min(originY, maxY));

        // Debugging prints for clamped values
        console.log("Clamped X: " + originX);
        console.log("Clamped Y: " + originY);

        mapGroup.setAttribute('transform', `translate(${originX}, ${originY}) scale(${scale})`);

        startX = event.clientX; // Update start position
        startY = event.clientY;
    }
});

// Function to format conditions for display
function formatConditions(conditions) {
    if (conditions.length === 0) return 'Any Condition';

    // Format each sub-array with ', ' and join them with '; '
    return conditions.map(cond => cond.join(', ')).join('; ');
}

// Function to generate HTML for OST sections
function generateOstSection(ost, conditions) {
    const youtubeLink = ost.youtubeUrl ? `<a class="ost-link" href="${ost.youtubeUrl}" target="_blank" aria-label="YouTube link to ${ost.name}"><img src="images/Youtube_logo.png" alt="Youtube logo" class="logo-image"/></a>` : '';
    const spotifyLink = ost.spotifyUrl ? `<a class="ost-link" href="${ost.spotifyUrl}" target="_blank" class="spotify" aria-label="Spotify link to ${ost.name}"><img src="images/Spotify_logo_without_text.svg.png" alt="Spotify logo" class="logo-image"/></a>` : '';
    const albumImage = ost.albumImage ? `<img src="images/albums/${ost.albumImage}" alt="Album cover for ${ost.name}" class="album-image">` : '';

    return `
                    <div class="ost-section">
                        <h3>${albumImage} ${ost.name}</h3>
                        <p>Conditions: ${formatConditions(conditions)}</p>
                        <div class="ost-buttons">
                            ${youtubeLink}
                            ${spotifyLink}
                        </div>
                    </div>
                `;
}

// Function to transform region data
function transformRegionData(region) {
    const ostMap = {};

    region.conditions.forEach(cond => {
        cond.ost.forEach(ost => {
            if (!ostMap[ost.name]) {
                ostMap[ost.name] = { ost, conditions: [] };
            }
            // Flatten the conditions before pushing them to ostMap
            ostMap[ost.name].conditions.push(...cond.conditions); // Use spread operator to flatten
        });
    });

    return ostMap;
}

// Function to display region information in the info-box
function displayRegionInfo(region) {
    infoBox.style.visibility = 'visible';
    infoBoxText.style.visibility = 'visible';
    infoBoxText.innerHTML = `<h2>${region.name}</h2>`;

    const ostMap = transformRegionData(region);

    const ostSections = Object.values(ostMap).map(({ ost, conditions }) => {
        return generateOstSection(ost, conditions);
    }).join('');

    infoBoxText.innerHTML += ostSections;

    // Set the background image based on the region's name
    const backgroundImageName = region.name.replace(/ /g, '_');
    infoBox.style.backgroundImage = `url('images/${backgroundImageName}.webp')`;
}

// Click event handler
mapGroup.addEventListener('click', function (event) {
    const regionElement = event.target;
    if (regionElement.tagName === 'path') {
        const regionName = regionElement.getAttribute('data-name');
        const region = findRegion(regionName, regionConfig);

        if (region) {
            displayRegionInfo(region);
        }
    }
});

// Function to find the region or sub-region in the configuration
function findRegion(regionName, config) {
    if (config[regionName]) {
        return config[regionName];
    }
    for (const region in config) {
        if (config[region].subRegions && config[region].subRegions[regionName]) {
            return config[region].subRegions[regionName];
        }
    }
    return null;
}

function searchOSTs() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (input === '') {
        searchResults.style.display = 'none';
        return;
    }

    searchResults.style.display = 'block';
    const results = new Map();

    for (const region in regionConfig) {
        for (const subregion in regionConfig[region].subRegions) {
            regionConfig[region].subRegions[subregion].conditions.forEach(condition => {
                condition.ost.forEach(ost => {
                    if (ost.name.toLowerCase().includes(input) && !results.has(ost.name)) {
                        results.set(ost.name, ost);
                    }
                });
            });
        }
    }

    if (results.size === 0) {
        searchResults.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(ost => {
            const ostElement = document.createElement('div');
            const youtubeLink = ost.youtubeUrl ? `<a class="ost-link" href="${ost.youtubeUrl}" target="_blank" aria-label="YouTube link to ${ost.name}"><img src="images/Youtube_logo.png" alt="Youtube logo" class="logo-image"/></a>` : '';
            const spotifyLink = ost.spotifyUrl ? `<a class="ost-link" href="${ost.spotifyUrl}" target="_blank" class="spotify" aria-label="Spotify link to ${ost.name}"><img src="images/Spotify_logo_without_text.svg.png" alt="Spotify logo" class="logo-image"/></a>` : '';
            const albumImage = ost.albumImage ? `<img src="images/albums/${ost.albumImage}" alt="Album cover for ${ost.name}" class="album-image">` : '';
            ostElement.className = 'ost';
            ostElement.innerHTML = `
                    <div class="ost-section">
                        <h3>${albumImage} ${ost.name}</h3>
                        <div class="ost-buttons">
                            ${youtubeLink}
                            ${spotifyLink}
                        </div>
                    </div>
            `;
            searchResults.appendChild(ostElement);
        });
    }
}

function hideInfoBox() {
    infoBox.style.visibility = 'hidden';
    infoBoxText.style.visibility = 'hidden';
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("infoSideBox").style.width = "300px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("infoSideBox").style.width = "0";
}

document.getElementById('searchResults').style.display = 'none';
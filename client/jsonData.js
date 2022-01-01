var showTime=2000;
function getJson() {
    var jsonArr = [{
            "name": "No Time To Die (2021)",
            "texts": {
                "line0": "James Bond has left active service.",
                "line1": "His peace is short-lived when Felix Leiter, an old friend from the CIA",
                "line2": "turns up asking for help, leading Bond onto the trail of a mysterious ",
                "line3": "villain armed with dangerous new technology",
            },
            "images": {
                "img0": "../client/images/jamesbond1.png",
                "img1": "../client/images/jamesbond2.png",
            },
            "template": "../client/templates/templateA.html",
            "showtime": showTime,
            "timeblock": {
                "startDate": "12-16-2021",
                "stopDate": "12-31-2021",
                "days": [1, 1, 1, 1, 1, 1, 1],
                "hours": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
            }
        },

        {
            "name": "Sing 2",
            "texts": {
                "line0": "This holiday season, the new chapter in Illumination’s smash animated franchise",
                "line1": "arrives with big dreams and spectacular hit songs",
                "line2": "as the ever-optimistic koala, Buster Moon, and his all-star cast of performers prepare",
                "line3": "to launch their most dazzling stage extravaganza yet",
                "line4": "f the world. There’s just one hitch: They first have ",
                "line5": "to persuade the world’s most reclusive rock",
                "line6": "star—played by global music icon Bono, in his animated film",
                "line7": "star—played by global music icon Bono, in his animated film",
                "line8": "star—played by global music icon Bono, in his animated film",
                "line9": "star—played by global music icon Bono, in his animated film",
            },
            "images": {
                "img0": "../client/images/sing.png",
            },
            "template": "../client/templates/templateB.html",
            "showtime": showTime,
            "timeblock": {
                "startDate": "12-16-2021",
                "stopDate": "12-31-2021",
                "days": [0, 1, 0, 1, 0, 0, 0],
                "hours": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
            }
        },

        {
            "name": "justice of league DC",
            "texts": {},
            "images": {
                "img0": "../client/images/jol.jpeg",
            },
            "template": "../client/templates/templateC.html",
            "showtime": showTime,
            "timeblock": {
                "startDate": "05-01-2021",
                "stopDate": "06-15-2021",
                "days": [1, 1, 1, 1, 1, 1, 1],
                "hours": [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0]
            }
        },
        {
            "name": "Spider-Man: No Way Home",
            "texts": {
                "line0": "Spider-Man: No Way Home is an upcoming American superhero film ",
                "line1": "by Sony Pictures Releasing. It is intended to be the sequel ",
            },
            "images": {
                "img0": "../client/images/spiderman.jpeg",
            },
            "template": "../client/templates/templateA.html",
            "showtime": showTime,
            "timeblock": {
                "startDate": "03-29-2021",
                "stopDate": "04-15-2021",
                "days": [0, 1, 0, 0, 0, 0, 0],
                "hours": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0]
            }
        },
        {
            "name": "Hawkeye",
            "texts": {
                "line0": "Hawkeye is an American television miniseries created by Jonathan Igla",
                "line1": "based on Marvel Comics featuring the characters Clint Barton",
                "line2": "Hawkeye and Kate Bishop / Hawkeye. It is the fifth television series",
                "line3": "Universe (MCU) produced by Marvel Studios, sharing continuity ",
                "line4": "and taking place after the events of the film Avengers:",
                "line5": "Igla serves as head writer with Rhys Thomas leading the",
                "line6": "Igla serves as head writer with Rhys Thomas leading the",
            },
            "images": {
                "img0": "../client/images/Hawkeye.png",
                "img1": "../client/images/Hawkeye2.png",
            },
            "template": "../client/templates/templateB.html",
            "showtime": showTime,
            "timeblock": {
                "startDate": "04-1-2021",
                "stopDate": "04-30-2021",
                "days": [0, 1, 1, 1, 0, 0, 0],
                "hours": [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
            }
        }
    ]
    module.exports = jsonArr;
    return jsonArr;
}

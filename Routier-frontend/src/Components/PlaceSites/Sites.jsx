import React from 'react'
import { Link } from "react-router-dom";
import './Sites.css'
import Card from './Card'
import hotel_icon from "../Assets/hotel_icon.svg"
import todo_icon from "../Assets/todo_icon.svg"
import restaurant_icon from "../Assets/restaurant_icon.svg"
import stories_ion from "../Assets/stories_icon.svg"
import place_img from "../Assets/place.png"


function Sites(props) {

    const places = [
        {
            "source": {
                "id": null,
                "name": "Lesswrong.com"
            },
            "author": "Hauke Hillebrandt",
            "title": "The AI Boom Mainly Benefits Big Firms, but long-term, markets will concentrate",
            "description": "> 'Market values strongly suggest a need for review. Especially now that competition from China is curtailed.' Bengt Holmström, MIT\n> \n> 'I fear Goog…",
            "url": "https://www.lesswrong.com/posts/guE3R9GLZLsCjK3ve/the-ai-boom-mainly-benefits-big-firms-but-long-term-markets-1",
            "urlToImage": "https://res.cloudinary.com/lesswrong-2-0/image/upload/v1654295382/new_mississippi_river_fjdmww.jpg",
            "publishedAt": "2023-10-29T08:38:23Z",
            "content": "'Market values strongly suggest a need for review. Especially now that competition from China is curtailed.' Bengt Holmström, MIT\r\n'I fear Google is becoming the new old Microsoft, before the antitru… [+3238 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Brooke Crothers, Contributor, \n Brooke Crothers, Contributor\n https://www.forbes.com/sites/brookecrothers/",
            "title": "EV Sales Losing Juice? Release The Kraken, Er, Cybertruck",
            "description": "EV demand is weakening — that’s the media theme for Q4. But, wait, the Cybertruck is coming and then all bets are off.",
            "url": "https://www.forbes.com/sites/brookecrothers/2023/10/29/ev-sales-losing-juice-release-the-kraken-er-cybertruck/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/653d540a8f630a1e0234e305/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2023-10-29T07:06:04Z",
            "content": "Tesla Cybertruck is one of the most anticipated vehicles this year. \r\nCredit: Tesla\r\nEV demand is weakening thats the media theme for Q4.\r\nBut are customers really not buying EVs now, as some media o… [+5396 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Autocar"
            },
            "author": null,
            "title": "Nio ET7",
            "description": "Well-sorted, lavishly equipped electric limo has tech wizardry to spare but the competition is fierce\n\nThe Nio ET7 is a 5.1m-long saloon showcasing the full kaleidoscope of this very modern Chinese car maker’s tech and luxury and is Nio’s answer to the Merced…",
            "url": "https://www.autocar.co.uk/car-review/nio/et7",
            "urlToImage": "https://www.autocar.co.uk/sites/autocar.co.uk/files/nio-et7-review-2023-001-cornering-front.jpg",
            "publishedAt": "2023-10-29T07:01:46Z",
            "content": "Ride and handling are very decent in the ET7, with the lower centre of gravity and active four-wheel drive coming into their own for a noticeably more involving drive than the EL6 SUV achieves. Thats… [+1462 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "outkick.com",
            "title": "Ford Pulls Plug On $12 Billion Electric Car Investment, Takes Massive Losses On EV’s After Biden Praise",
            "description": "The Biden Administration, state of California and most of Europe have made it a priority to push electric cars on consumers going forward. And consumers are overwhelmingly rejecting them. Ford, one of the world’s largest auto manufacturers, announced on Frida…",
            "url": "https://biztoc.com/x/68bc473860b3e0e0",
            "urlToImage": "https://c.biztoc.com/p/68bc473860b3e0e0/og.webp",
            "publishedAt": "2023-10-29T06:32:07Z",
            "content": "The Biden Administration, state of California and most of Europe have made it a priority to push electric cars on consumers going forward.And consumers are overwhelmingly rejecting them.Ford, one of … [+254 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "finance.yahoo.com",
            "title": "The 'Magnificent 7' stocks are struggling, shedding a staggering $1.2 trillion in market value since US equities peaked in July",
            "description": "None After a stunning first-half rally, the so-called \"Magnificent Seven\" mega-cap Big Tech stocks have struggled in recent months. • None Apple, Microsoft, Alphabet, Amazon, Nvidia, Meta, and Tesla have lost a whopping $1.2 trillion in market value since the…",
            "url": "https://biztoc.com/x/909905b3cf4c20d9",
            "urlToImage": "https://c.biztoc.com/p/909905b3cf4c20d9/s.webp",
            "publishedAt": "2023-10-29T05:30:06Z",
            "content": "None After a stunning first-half rally, the so-called \"Magnificent Seven\" mega-cap Big Tech stocks have struggled in recent months.None Apple, Microsoft, Alphabet, Amazon, Nvidia, Meta, and Tesla hav… [+280 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Neocities.org"
            },
            "author": "dannyw",
            "title": "All GB/S Without Flops – Nvidia CMP 170HX Review",
            "description": "This article contains a basic Nvidia CMP 170HX performance overview, a performance lockdown workaround, a hardware teardown, a watercooling installation guide, and a repair log.",
            "url": "https://niconiconi.neocities.org/tech-notes/nvidia-cmp-170hx-review/",
            "urlToImage": "https://niconiconi.neocities.org/img/nvidia-cmp-170hx-review/cmp-170hx-teardown-0.jpg",
            "publishedAt": "2023-10-29T04:30:13Z",
            "content": "October 25, 2023\r\nIn 2021, at the height of Ethereum mining, Nvidia released the Nvidia\r\nCMP 170HX. Designed as a compute-only card to accelerate the memory-bound\r\nEthash Proof-of-Work algorithm with… [+62435 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Dansdeals.com"
            },
            "author": "Mimi",
            "title": "Tune In Today, Sunday, October 29th To Watch The FREE Live Event Of The Year In Jewish Entertainment!",
            "description": "Please note: This is a stickied sponsored post, please scroll down for new posts. Tune In Today, Sunday, October 29th To Watch The FREE Live Event Of The Year In Jewish Entertainment! Today, Sunday, October 29th, at 6:30 PM, the Tenathon will be held LIVE – f…",
            "url": "https://www.dansdeals.com/advertisement/tune-today-sunday-october-29th-watch-free-live-event-year-jewish-entertainment/",
            "urlToImage": "https://i.dansdeals.com/wp-content/uploads/2023/10/28204030/Ten-Yad-5784-Dans-Deals-Show-compressed.jpg",
            "publishedAt": "2023-10-29T04:04:46Z",
            "content": "Please note: This is a stickied sponsored post, please scroll down for new posts.\r\nTune In Today, Sunday, October 29th To Watch The FREE Live Event Of The Year In Jewish Entertainment!\r\nToday, Sunday… [+1227 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Biztoc.com"
            },
            "author": "u.today",
            "title": "Elon Musk's Celebratory Tweet Sparks Grateful Reaction of Crypto Community",
            "description": "It has been a year since Elon Musk bought Twitter in October 2022. He has posted a tweet to highlight a year anniversary since he closed the deal on purchasing the social media microblogging platform for $44 billion. \"Freedom,\" the tech tycoon wrote, citing h…",
            "url": "https://biztoc.com/x/00202a2297fbec9d",
            "urlToImage": "https://c.biztoc.com/p/00202a2297fbec9d/og.webp",
            "publishedAt": "2023-10-29T03:56:06Z",
            "content": "It has been a year since Elon Musk bought Twitter in October 2022. He has posted a tweet to highlight a year anniversary since he closed the deal on purchasing the social media microblogging platform… [+284 chars]"
        }
    ]
    const {type} = props;
    return (
        <div className="main">

            {/***** titlebar section ******/}
            <section className="titleBar">
                <div className="heading">
                    <p className="titletext">Explore <span className="placename">Popular {type} in [place_name]</span></p>
                </div>


                <div className="buttons">

                    <Link to="/place">
                        <div className="button">
                            place_name
                            <img src={stories_ion} alt="icon" />
                        </div>
                    </Link>

                    <Link to="/hotels">
                        <div className="button">
                            Hotels
                            <img src={hotel_icon} alt="icon" />
                        </div>
                    </Link>

                    <Link to="/todo">
                        <div className="button">
                            Things to do
                            <img src={todo_icon} alt="icon" />
                        </div>
                    </Link>

                    <Link to="/restaurants">
                        <div className="button">
                            Restaurants
                            <img src={restaurant_icon} alt="icon" />
                        </div>
                    </Link>


                </div>



            </section>
            {/******** sites section ************/}
            <section className="sites">
                {places.map((place, index) => (

                    <Card title={place.title} description={place.description} img={place.urlToImage} rating={2} />
                ))}
            </section>
        </div>
    )
}

export default Sites

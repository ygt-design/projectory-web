import testProjectory from '../../assets/videos/testProjectory.mp4';

export const products = [
  {
    id: 'floating-opinions',
    name: 'Floating Opinions',
    tagline: 'A discussion and alignment workshop exploring big questions in a playful way',
    category: 'Floating',
    categoryHighlight: 'Opinions',
    categoryColor: '#BCCE2C',
    heroVideo: testProjectory,
    bgVideo: 'https://www.youtube.com/embed/e0yjbBHGAbI',
    tags: ['Networking', 'Peer learning', 'Visualize insights'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'A discussion and alignment workshop exploring big questions in a playful way',

    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Facilitate peer learning and dialogue",
        "Explore strategic priorities and decisions",
        "Build alignment and consensus",
        "Visualize collective insights",
      ],
      "seating": [
        "Round tables",
        "Not sure yet"
      ]
    },
    
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Floating Opinions is an inclusive discussion and alignment session that playfully smuggles in elements of surprise and delight. Participants explore a series of big questions connected to event themes and content with their table groups and then signal their positions to the rest of the room by raising and lowering balloons – creating a stunning visual to accompany a facilitated shareout of different perspectives.',

          features: ['Facilitated session', '40 – 60 min', 'Main stage or breakout', '40 - 500+ participants', 'Requires table seating']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as an opening session' },
            { text: 'Creates a uniquely spectacular visual moment at the event'},
            { text: 'Promotes conversation across silos and established groups' }
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: 'Event organizers select discussion questions in advance, each with multiple response options. After each question is introduced, table groups quickly discuss and align on their preferred response. Then, each table uses a special device to signal a response by raising or lowering a balloon, creating a striking visualization across the room as dozens of balloons lift in unison.<br /> <br />The facilitator then prompts participants from different tables to share their perspectives. Moving between table discussions and full-room shareouts creates a lively, layered conversation and an opportunity to explore multiple perspectives on key topics.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Facilitate peer learning and dialogue',
            'Build alignment and consensus',
            'Explore strategic priorities and decisions',
          ]
        }
      },
      // {
      //   type: 'video',
      //   content: {
      //     videoUrl: 'https://www.youtube.com/embed/9nlyM-aAfrc?si=jAg4LeooyFUvvB88',
      //     title: 'How we Prepare This Experience',
      //     highlightWords: ['How', 'This'],
      //     description: 'Ad scelerisque a arcu dis platea tristique class parturient parturient volutpat nisi dictum gravida scelerisque vestibulum. Dis dolor elit facilisi morbi adipiscing ad eros dapibus ante condimentum a tempus pretium a erat leo scelerisque adipiscing a.'
      //   }
      // },
      // { 
      //   type: 'dataFeature',
      //   content: {
      //     title: 'Data Gathering',
      //     description: 'Lorem Ipsum this is sample data gathered from this experience. This describes the types of information we can collect from this experience and alludes to a post-event package. ',
      //     imageUrl: '/public/images/Projectory_Website_PostEvent.png'
      //   }, 
      // },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      // {
      //   type: 'testimonialSizzle',
      //   content: {
      //     videoSrc: 'https://www.youtube.com/embed/9nlyM-aAfrc?si=jAg4LeooyFUvvB88', // Replace with actual video ID
      //     quote: 'Projectory helped bring our conference to life. As soon as I heard they took the analog experience and could make it read out results for us, I was blown away.',
      //     author: 'Sandy Sharman',
      //     role: 'Group Head, People Culture & Brand, CIBC'
      //   }
      // },
      // { 
      //   type: 'case-study',
      //   content: {
      //     title: 'See it In Action',
      //     description: 'Learn about how this product came to life at a past event and now it played a role in a fulsome event program.',
      //     buttonLink: '/case-study/floating-opinions',
      //     caseStudyTitle: 'Building Commitment in a Two-Day Leadership Event',
      //     caseStudySubtitle: 'CIBC Executive Alignment',
      //     caseStudyImage: 'https://s3-alpha-sig.figma.com/img/f1bf/650c/01c0bb4294b3954a8be0e9b277d0a9e7?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PuvmpHqMAlD6as~20PKlnGLsdi3Z~31onepRTbU4hWjSothUyRXCRO3qYRmJYE59C45OwsqApwK1FFOAOz4YPY5-lZXdzAHPKjRxHwrt2~0CCzXi0cebpjmQF5y3bScplCA2TeXG7N2wngWuriioq6FA-guzWctadsi4o23JkccexBE8SztdDTquCUPnFVNS6FNzPoqx2eS~B2jsptgPqT027KXHEcKrsXrnjgSXHP-~RBJfU-Y-02YyWBVXqc5xGThAcE2CDp92fBwKeH1SuNwJAXtT0N69HmXBw2w7sRlD~g-N1gEmFKCok~abWc8hasuINLYpMttjO0T7dzjDmw__'
      //   }
      // }
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '9,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Remote support',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]              
            },
            {
              title: 'We Do',
              price: '13,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator',
                'Projectory on-site support',
                'White-glove logistics',
                '24/7 dedicated account manager'
              ]                               
            },
            {
              title: 'We Do & More',
              price: '14,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Custom branding',
                'Bespoke experience design',
                'Additional on-site staff'
              ]                                      
            }
          ]
        }
      }
    ]
  },
  {
    id: 'flag-finder',
    name: 'Flag Finder',
    tagline: 'A networking, discussion, and micro-tribe formation workshop',
    category: 'Flag',
    categoryHighlight: 'Finder',
    categoryColor: '#2BDCB7',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Networking', 'Peer learning', 'Visualize insights'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a', 
    shortDescription: 'A networking, discussion, and micro-tribe formation workshop',

    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Foster connection and networking",
        "Facilitate peer learning and dialogue",
        "Visualize collective insights",
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },
    
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Flag Finder is a playfully energizing networking and discussion session that promotes purposeful mixing and re-mixing of participants while also creating real-time, color-coded visualizations of opinions, attitudes, and sentiments in the room.',

          features: ['Facilitated session', '40 - 60 min', 'Main stage or breakout', '40 - 500+ participants', 'Works in any seating type']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as an opening or networking activity' },
            { text: 'Energizes a room with movement'},
            { text: 'Promotes connection beyond established groups and teams'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The session is organized around a set of multiple-choice sorting questions to be posed to the participants – one question per round. Each question will have four possible responses – color-coded to the four flags that participants choose from to signal their response each round. After they have chosen their response flag colors, participants move about the room and form small groups with same / different colors to set up distinct response matches.<br /><br />In their small groups, participants share & elaborate responses or address additional themes with their new connections.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Foster connection and networking',
            'Facilitate peer learning and dialogue',
            'Visualize collective insights',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '7,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Remote support',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                                
            },
            {
              title: 'We Do',
              price: '10,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator',
                'Projectory on-site support',
                'White-glove logistics',
                '24/7 dedicated account manager'
              ]                                                            
            },
            {
              title: 'We Do & More',
              price: '12,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Bespoke experience design',
                'Additional on-site staff'
              ]                                                                       
            }
          ]
        }
      }
    ]
  },
  {
    id: 'align-by-line',
    name: 'Align by Line',
    tagline: 'A collaborative reflection and synthesis session that builds alignment through a shared narrative ',
    category: 'Align',
    categoryHighlight: 'ByLine',
    categoryColor: '#A72C4B',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Peer learning', 'Build alignment', 'Reflect & synthesize'],
    thumbnail: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg',
    shortDescription: 'A collaborative reflection and synthesis session that builds alignment through a shared narrative',

    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Facilitate peer learning and dialogue",
        "Build alignment and consensus",
        "Promote reflection and synthesis",
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Align by Line is a reflection and synthesis session that takes the simple mechanism of a fill-in-the-blank game and turns it into the foundation of a highly entertaining, conversational workshop designed to build alignment and a shared story about the event journey and the road ahead.',

          features: ['Facilitated session', '50 - 70 min', 'Main stage or breakout', '40 - 500 participants', 'Best for table seating']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as a closing session' },
            { text: 'Resulting narrative is easily shareable and highly photogenic'},
            { text: 'Creates a great foundation for post-event follow up'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The session is built around a physical wall of text that is missing critical pieces – literal blank spaces to be filled with blocks of text determined by the participants. As the facilitator guides the room through the fill-in-the-blank text – which becomes the basis of a “shared narrative” about the event journey, key takeaways, next steps, etc. – table groups are prompted to nominate contributions to complete the story.<br /><br />For each blank, the facilitator leads a shareout, offering an opportunity for participants to exchange perspectives and engage in friendly debate about implementation and action until the narrative and synthesis are complete.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Foster connection and networking',
            'Facilitate peer learning and dialogue',
            'Visualize collective insights',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '8,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Remote support',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]
            },
            {
              title: 'We Do',
              price: '12,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator',
                'Projectory on-site support',
                'White-glove logistics',
                '24/7 dedicated account manager',
                'Custom printing assets'
              ]                         
            },
            {
              title: 'We Do & More',
              price: '14,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Custom branding',
                'Interactive post event report',
                'Additional on-site staff'
              ]                          
            }
          ]
        }
      }
    ]
  },
  {
    id: 'combo-convo',
    name: 'Combo Convo',
    tagline: 'A wild idea-generating, networking, and conversation mash-up',
    category: 'Combo',
    categoryHighlight: 'Convo',
    categoryColor: '#2BDCB7',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Networking', 'Inspire creativity'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'A wild idea-generating, networking, and conversation mash-up',

    filters: {
      "type": [
        "Facilitated session",
        "Interactive installation"
      ],
      "objectives": [
        "Foster connection and networking",
        "Inspire forward thinking and creativity"
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Combo Convo is an energizer and creative juicer built around an adaptable set of prompt cards. The session can be run just as an energizer or as a game with elements of networking and competition that can be tailored to objectives, available time, etc.<br /><br />Each card-based interaction creates a unique prompt that will get participants thinking, chatting, collaborating, and laughing. Combo Convo can be played by small groups at tables or scaled up for large audiences by leveraging event apps etc',

          features: ['Facilitated session', '15 - 30 min', 'Main stage or breakout', '50 - 4000 participants', 'Works for any seating ']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as an icebreaker or networking game' },
            { text: 'Can feed into an interactive installation or event app'},
            { text: 'Highly customizable to event themes and content '}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "Combo Convo is designed around an adaptable set of combination prompt cards that can be tailored to event content and themes. The basic interaction involves participants matching pairs of cards to create unique prompt questions and then riffing on creative responses. <br /><br />The game works wonderfully as a quick energizer to warm a crowd, but it can also be built up with additional elements of competitive game play and networking or integrated with an installation or event app for capture and display of responses. ",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Foster connection and networking',
            'Inspire forward thinking and creativity',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '4,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: ['Rent-and-run toolkit', 'Slides and facilitation guide', 'Remote and day-of support', 'Onboarding call', 'Shipment coordination'],
            },
            {
              title: 'We Do',
              price: '7,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Event theme and content integration', 'On-site Projectory Facilitator','Custom printing assets'],
            },
            {
              title: 'We Do & More',
              price: '9,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Custom branding', 'Bespoke experience design'],
            }
          ]
        }
      }
    ]
  },
  {
    id: 'futures-web',
    name: 'Futures Web',
    tagline: 'An installation that weaves a striking visualization of collective insights',
    category: 'Futures',
    categoryHighlight: 'Web',
    categoryColor: '#178771',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Visualize insights', 'Explore priorities'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An installation that weaves a striking visualization of collective insights',

    filters: {
      "type": [
        "Interactive installation"
      ],
      "objectives": [
        "Explore strategic priorities and decisions",
        "Promote reflection and synthesis",
        "Visualize collective insights",
      ],
      "seating": [
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Futures Web is an interactive installation that helps attendees engage with key content themes as participants while also learning about the perspectives and priorities of the cohort at large. Each new interaction adds another thread to an emerging picture of the group.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space' },
            { text: 'Creates a striking physical data visualization'},
            { text: 'Generates rich post-event output Encourages participants to experiment with a creative, futures-thinking lens to their work'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a series of multiple choice questions aligned with program content and chosen to allow participants a chance to share perspectives, opinions, and priorities. Each question is represented with a post featuring pegs that correspond to potential answer choices. Participants work from post to post threading a color-coded strand of yarn around the pegs that reflect their responses. <br /> <br />With every new interaction, the woven picture grows richer and more illuminating. Patterns and insights from the resulting web can be brought back to plenary sessions or digitized and reported out post event.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Visualize collective insights',
            'Explore strategic priorities and decisions',
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Futures Web functions as a thematically aligned, anonymized five-question survey of attendee opinions and priorities. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '8,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: ['Rent-and-run toolkit', 'Explainer videos & setup guide', 'Remote support', 'Remote and day-of support', 'Onboarding call', 'Shipment coordination '],
            },
            {
              title: 'We Do',
              price: '11,000',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: ['Event theme and content integration', 'Projectory on-site support', 'White-glove logistics', '24/7 dedicated account manager', 'Custom printing assets'],
            },
            {
              title: 'We Do & More',
              price: '13,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Custom branding', 'Main stage installation trends discussion', 'Interactive post event report', 'Additional on-site staff'],
            }
          ]
        }
      }
    ]
  },
  {
    id: 'if-this-then-what',
    name: 'If This Then What?',
    tagline: 'An envisioning workshop exploring the implications of trends and strategic decisions',
    category: 'IfThis',
    categoryHighlight: 'ThenWhat?',
    categoryColor: '#B292C4',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Inspire creativity', 'Explore priorities', 'Peer learning'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/b4377ae409b44295292106d9caf008afd4b3f8d9',
    shortDescription: 'An envisioning workshop exploring the implications of trends and strategic decisions',

    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Facilitate peer learning and dialogue",
        "Explore strategic priorities and decisions",
        "Connect ideas to action",
        "Inspire forward thinking and creativity"
      ],
      "seating": [
        "Round tables",
        "Not sure yet"
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'If This…Then What? is Projectory’s adaptation of a classic strategic foresight tool called the Futures Wheel. The exercise is designed to explore the potential ripple effects of a specific trend, event, or decision. Working in groups, participants envision the cascading implications and knock-on effects to map out a range of possible futures full of opportunities, risks, and unintended consequences.',

          features: ['Facilitated session', '45 - 70 min', 'Main stage or breakout', '40 - 400 participants', 'Requires table seating ']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Pairs particularly well with forward-looking content sessions (e.g., industry trends, strategic planning, etc)' },
            { text: 'Generates rich post-event output'},
            { text: 'Encourages participants to experiment with a creative, futures-thinking lens to their work ' }
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The workshop begins with a simple canvas and a set of trends or developments of interest. These can be selected in advance or identified by participants as an initial step in the workshop. In conversation at their tables, participants explore the cascading implications of their chosen topic, mapping out ripple effects with a specific focus on identifying new opportunities and emerging risks. Then, the groups work backward – asking what specific actions could be taken today in light of the opportunities and risks they’ve surfaced. The session ends with a facilitated shareout.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Inspire forward thinking and creativity',
            'Explore strategic priorities and decisions',
            'Facilitate peer learning and dialogue'
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'At the end of the session, all of the creative canvases are digitized for post-event analysis and shareback in an easily digetible report format highlighting patterns among the opportunities and risks identified and the suggested actions to be taken today to better prepare for tomorrow.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '5,300',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                          
            },
            {
              title: 'We Do',
              price: '9,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator'
              ]                                                   
            },
            {
              title: 'We Do & More',
              price: '11,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Custom branding',
                'Bespoke experience design',
                'Interactive post event report'
              ]                                                           
            }
          ]
        }
      }
    ]
  },
  {
    id: 'learning-action-matrix',
    name: 'Learning Action Matrix',
    tagline: 'A quick synthesis workshop for tackling high-value topics and connecting ideas to action',
    category: 'LearningAction',
    categoryHighlight: 'Matrix',
    categoryColor: '#EEDA2A',
    heroVideo: '/videos/testVideo_2.mp4',
    bgVideo: 'https://www.youtube.com/embed/e0yjbBHGAbI',
    tags: ['Ideas to action', 'Reflect & synthesize', 'Peer learning'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'A quick synthesis workshop for tackling high-value topics and connecting ideas to action',

    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Facilitate peer learning and dialogue",
        "Connect ideas to action",
        "Promote reflection and synthesis"
      ],
      "seating": [
        "Round tables",
        "Not sure yet"
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'The Learning-Action Matrix is a simple, intuitive framework designed to support more effective conversations following up, unpacking, and/or synthesizing information-dense sessions or keynotes. The true value of the session emerges as participants discover dynamic links between the insights gained and the related actions to be taken -- which will yield future insights through learning.',

          features: ['Facilitated session', '35 - 55 min', 'Main stage or breakout', '40 - 400 participants', 'Requires table seating ']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Works great as an end-of-day debrief or a synthesis following an information-dense keynote'},
            { text: 'Intuitive reflection & synthesis model that can be applied to a wide range of content '},
            { text: 'Generates rich post-event output'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The workshop leverages a simple framework built to consolidate learning through conversation and connect it to post-event action. After a quick intro to the LAM canvas, most of the session is devoted to small group work, followed by a round of facilitated share-outs. In their groups, participants work through four interrelated categories -- identifying key insights and questions and actions to be taken to implement new learnings or deepen understanding. The workshop results in a detailed set of learning-action plans and a rich set of outputs to drive the post-event agenda.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Connect ideas to action',
            'Promote reflection and synthesis',
            'Facilitate peer learning and dialogue'
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'At the end of the session, all of the creative canvases are digitized for post-event analysis and shareback in an easily digetible report format highlighting patterns among the insights and questions generated and the actions to be prioritized.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '4,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                                          
            },
            {
              title: 'We Do',
              price: '8,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'On-site Projectory Facilitator',
              ]                                                            
            },
            {
              title: 'We Do & More',
              price: '11,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Custom branding',
                'Bespoke experience design',
                'Interactive post event report'
              ]                                                                                 
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ping-poll',
    name: 'Ping Poll',
    tagline: 'A dynamic voting activity that creates a snapshot of group priorities or opinions',
    category: 'Ping',
    categoryHighlight: 'Poll',
    categoryColor: '#F37655',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Visualize insights', 'Explore priorities'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'A dynamic voting activity that creates a snapshot of group priorities or opinions',

    filters: {
      "type": [
        "Interactive installation"
      ],
      "objectives": [
        "Explore strategic priorities and decisions",
        "Promote reflection and synthesis",
        "Visualize collective insights"
      ],
      "seating": [
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Ping Poll is an interactive installation that lets your attendees weigh in on any content, theme, or question that can be voted or ranked. It provides an easy way to activate an informal space with a playful data visualization that creates a snapshot of group priorities and perspectives.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space'},
            { text: 'Creates a striking physical data visualization'},
            { text: 'Generates rich post-event output'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around up to four related questions – anything that attendees can answer by voting among, ranking, or prioritizing response choices.  For each question, response choices are represented with tubes into which participants drop color-coded ping pong ball votes. As votes are cast, tubes corresponding to favored responses fill up, creating a visualization that can easily be digested at a glance. <br /><br />The simple design allows for a surprising number of configurations and yields quick data to be fed back into plenary sessions or synthesized for a post-event report.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Visualize collective insights',
            'Explore strategic priorities and decisions',
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Ping Poll works fantastically as an at-a-glance snapshot of attendee priorities and perspectives. The installation is also supported with custom slides that can be integrated into a deck for a quick shareout in a plenary session. Alternately, the full set of votes can be tabulated and analyzed after the event for inclusion in a follow-on report.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '6,500',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: ['Rent-and-run toolkit', 'Explainer videos & setup guide', 'Remote support', 'Remote and day-of support', 'Onboarding call', 'Shipment coordination '],
            },
            {
              title: 'We Do',
              price: '8,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: ['Event theme and content integration', 'Projectory on-site support', 'White-glove logistics', '24/7 dedicated account manager', 'Custom printing assets'],
            },
            {
              title: 'We Do & More',
              price: '10,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Custom branding', 'Main stage installation trends discussion', 'Interactive post event report'],
            }
          ]
        }
      }
    ]
  },
  {
    id: 'priority-pathways',
    name: 'Priority Pathways',
    tagline: 'An interactive installation that captures attendee sentiments on key issues and content',
    category: 'Priority',
    categoryHighlight: 'Pathways',
    categoryColor: '#A72C4B',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Visualize insights', 'Explore priorities'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An interactive installation that captures attendee sentiments on key issues and content',
  
    filters: {
      "type": [
        "Interactive installation"
      ],
      "objectives": [
        "Explore strategic priorities and decisions",
        "Build alignment and consensus",
        "Visualize collective insights"
      ],
      "seating": [
      ]
    },

    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Priority Pathways is an interactive installation that supports attendee engagement with key content themes using dot voting across 2x2 matrices and Likert/slider-type scales to explore sentiments, priorities, etc. The design is highly adaptable, creates an attractive data visualization in physical space, and can work well as a self-guided interaction.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space'},
            { text: 'Creates a striking physical data visualization'},
            { text: 'Generates rich post-event output'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a series of questions or prompts that are aligned with program content and chosen to allow participants a chance to share perspectives, opinions, and priorities. The questions are mapped onto 2x2 matrices and/or Likert or slider-type scales, and participants are invited to register votes and responses with color-coded dot voting. <br /> <br />With every new response, the picture grows richer and more illuminating as a visualization of participant input emerges in physical space. Patterns and insights from the resulting visualization can be brought back to plenary sessions or digitized and reported out post event.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Visualize collective insights',
            'Explore strategic priorities and decisions',
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Priority Pathways functions as a thematically aligned, anonymized survey of attendee opinions and priorities. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      }
    ]
  },
  {
    id: 'reflection-collection',
    name: 'Reflection Collection',
    tagline: 'A reflection activity that brings attendees into conversation',
    category: 'Reflection',
    categoryHighlight: 'Collection',
    categoryColor: '#EEDA2A',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Visualize insights', 'Explore priorities'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'A reflection activity that brings attendees into conversation',

    filters: {
      "type": [
        "Interactive installation"
      ],
      "objectives": [
        "Explore strategic priorities and decisions",
        "Promote reflection and synthesis",
      ],
      "seating": [
      ]
    },
  
    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'The Reflection Collection is a card-based installation designed to encourage, capture, and showcase attendee contributions – turning your attendees into active participants in an ongoing exchange of perspectives on program themes and content. <br /> <br /> As the Collection grows, it becomes a powerful and accessible site for attendees to draw inspiration from peers and colleagues. It activates an informal space, and provides an easy engagement that can be brought into main stage sessions or breakouts.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space'},
            { text: 'Engages attendees in an ongoing exchange of perspectives on event themes and content'},
            { text: 'Generates rich post-event output'}
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a set of prompt cards featuring up to five pre-determined reflection prompts. Ideally, these are passed out in the main room or breakouts, creating a moment that can also be used for synthesis conversations and new connections.<br /><br />After participants take a moment to address the reflection prompts, they’re invited to visit the installation to see what their colleagues and peers have contributed. As the Collection fills in, it becomes an increasingly rich source of bold ideas, rich questions, and valuable insights that can be fed back into plenary sessions or synthesized for a post-event report.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Promote reflection and synthesis',
            'Facilitate peer learning and dialogue',
            'Foster connection and networking'
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Reflection Collection functions during the event as a physical site of inspiration and exchange. The installation is also supported with custom slides that can be integrated into a deck for a quick share-out in a plenary session. And when the event concludes, all cards can be digitized and analyzed for a follow-on synthesis report.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '8,500',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: ['Rent-and-run toolkit', 'Explainer videos & setup guide', 'Remote support', 'Slides and facilitation guide','Remote and day-of support', 'Onboarding call', 'Shipment coordination '],
            },
            {
              title: 'We Do',
              price: '11,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: ['Event theme and content integration', 'Projectory on-site support', 'White-glove logistics', '24/7 dedicated account manager', 'Custom printing assets'],
            },
            {
              title: 'We Do & More',
              price: '13,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Main stage installation trends discussion', 'Interactive post event report', 'Additional on-site staff'],
            }
          ]
        }
      }
    ]
  },
  {
    id: 'taking-action',
    name: 'Taking Action',
    tagline: 'A closing synthesis session focused on commitments and accountability',
    category: 'Taking',
    categoryHighlight: 'Action',
    categoryColor: '#F37655',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/b4377ae409b44295292106d9caf008afd4b3f8d9',
    shortDescription: 'A closing synthesis session focused on commitments and accountability',
  
    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Connect ideas to action",
        "Build alignment and consensus",
        "Promote reflection and synthesis",
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },

    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Taking Action is designed to build alignment on next steps and a shared sense of purpose, momentum, and clear accountability. Most events end on an energetic high note… and then fail to translate that energy into meaningful action. This session ensures that participants identify and own the next steps – and that they’ll move forward together.',

          features: ['Facilitated session', '35 - 60 min', 'Main stage', '40 - 500 participants', 'Requires table seating ']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as a closing session with a focus on next steps and accountability' },
            { text: 'Generates rich post-event output'},
            { text: 'Can simplified to adapt to shorter duration and/or theater seating ' }
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The Taking Action session (typically programmed at the end of an event) blends facilitated reflection, a card-based interaction, and a creative canvas to elicit and align individual commitments to post-event action with a set of high-value organizational or cohort-level objectives. <br /><br /> The workshop starts from a high-level collective prompt sourced from the client and asks participants to each identify a clear, critical collective commitment to be made. Those collective commitment ideas are then shuffled, assessed, and ranked, and the top 5 are shared aloud.<br /><br /> At that point, the participants are then asked to make personal commitments to concrete actions that they will take to support those high-priority collective commitments. These are captured in a creative canvas to be digitized and leveraged post-event to support accountability and real action toward organizational goals.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Connect ideas to action',
            'Promote reflection and synthesis',
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'At the end of the session, all of the creative canvases are digitized for post-event usage and shareback in an easily digetible report format. Individual commitments and accountable owners are associated in a spreadsheet that can be used in follow-on communication, personalized reminder emails, etc. to maintain momentum and drive action.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '4,000',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                                          
            },
            {
              title: 'We Do',
              price: '8,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator'
              ]                                                                         
            },
            {
              title: 'We Do & More',
              price: '11,500',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Custom branding',
                'Bespoke experience design',
                'Interactive post event report'
              ]                                                                                 
            }
          ]
        }
      }
    ]
  },
  {
    id: 'vision-forest',
    name: 'Vision Forest',
    tagline: 'An installation that lets you wander (and wonder) through future visions',
    category: 'Vision',
    categoryHighlight: 'Forest',
    categoryColor: '#B8EFEC',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An installation that lets you wander (and wonder) through future visions',
  
    filters: {
      "type": [
        "Interactive installation"
      ],
      "objectives": [
        "Promote reflection and synthesis",
        "Visualize collective insights"
      ],
      "seating": [
      ]
    },

    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'Vision Forest is an interactive installation that brings attendees into the conversation at the level of inspiration -- inviting them to share future visions, hopes/fears, statements of mission/purpose, or other sentiments that align with program themes. The collected contributions are showcased spatially in a dense "forest" of hanging ribbons that attendees can explore throughout the program.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space' },
            { text: 'Brings attendees into the conversation'},
            { text: 'Generates rich post-event output' }
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a prompt (or several) chosen to align with key event content and themes — often at a high level that helps to frame the overall experience. Attendees can be invited to weigh in pre-program, at registration, following a main stage session, or during breaks, and as they share their visions, concise statements of purpose, hopes/fears, etc., those sentiments are captured and showcased in an installation that becomes a source of interest and inspiration in an informal space. <br /><br /> The 'forest' is highly photogenic and can also provide rich material that's easily woven back into main stage or breakout sessions.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/1732132444884_m9izvg.jpg'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107983/Lifemark_306_ij4g80.jpg',
          objectives: [
            'Visualize collective insights',
            'Explore strategic priorities and decisions',
          ]
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Vision Forest allows event organizers to pose one big question to attendees for anonymous response and display in the installation. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-1054_psduh0.jpg'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1746107986/Screenshot_2024-12-03_at_21.23.30_q6yaqv.png'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'We Do',
              price: '19,000',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: ['Event theme and content integration', 'Projectory on-site support', 'White-glove logistics', '24/7 dedicated account manager', 'Custom printing assets'],
            },
            {
              title: 'We Do & More',
              price: '23,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: ['Custom branding', 'Bespoke experience design ','Main stage installation trends discussion', 'Interactive post event report', 'Additional on-site staff'],
            }
          ]
        }
      }
    ]
  },
  {
    id: 'block-party',
    name: 'Block Party',
    tagline: 'An installation that lets you wander (and wonder) through future visions',
    category: 'Block',
    categoryHighlight: 'Party',
    categoryColor: '#F37655',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An installation that lets you wander (and wonder) through future visions',
  
    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Foster connection and networking",
        "Facilitate peer learning and dialogue"
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },

    sections: [
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '7,500',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Remote support',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                                             
            },
            {
              title: 'We Do',
              price: '10,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Event theme and content integration',
                'On-site Projectory Facilitator',
                'Projectory on-site support',
                'White-glove logistics',
                '24/7 dedicated account manager'
              ]                                                                                    
            },
            {
              title: 'We Do & More',
              price: '12,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'Bespoke experience design',
                'Additional on-site staff'
              ]                                                                                             
            }
          ]
        }
      }
    ]
  },
  {
    id: 'pointing-the-way',
    name: 'Pointing the Way',
    tagline: 'An installation that lets you wander (and wonder) through future visions',
    category: 'PointingThe',
    categoryHighlight: 'Way',
    categoryColor: '#BCCE2C',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An installation that lets you wander (and wonder) through future visions',
  
    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Explore strategic priorities and decisions",
        "Build alignment and consensus",
        "Inspire forward thinking and creativity"
      ],
      "seating": [
        "Round tables",
        "Not sure yet"
      ]
    },

    sections: []
  },
  {
    id: 'roll-play',
    name: 'Roll Play',
    tagline: 'An installation that lets you wander (and wonder) through future visions',
    category: 'Roll',
    categoryHighlight: 'Play',
    categoryColor: '#178771',
    heroVideo: '/videos/testVideo_2.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize'],
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
    shortDescription: 'An installation that lets you wander (and wonder) through future visions',
  
    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Foster connection and networking",
        "Inspire forward thinking and creativity"
      ],
      "seating": [
        "Any",
        "Round tables",
        "Theatre",
        "Not sure yet"
      ]
    },

    sections: [
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'You Do',
              price: '3,000',
              description: 'For teams who want us in the room to ensure everything flows.',
              features: [
                'Rent-and-run toolkit',
                'Explainer videos & setup guide',
                'Remote support',
                'Slides and facilitation guide',
                'Remote and day-of support',
                'Onboarding call',
                'Shipment coordination'
              ]                                                        
            },
            {
              title: 'We Do',
              price: '8,000',
              description: 'For teams looking to make the experience unmistakably their own.',
              features: [
                'On-site Projectory Facilitator',
                'White-glove logistics'
              ]                                                                                                 
            }
          ]
        }
      }
    ]
  }
];
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
          heading: 'Floating Metrics is a discussion and alignment workshop that explores big questions in a playful and inclusive way',
          description: 'Moving between table discussions and full-room share outs creates a lively, layered conversation and an opportunity to explore multiple perspectives on your key topics.',
          features: ['15-30 mins', 'Interactive group exercise', 'Live polling', 'Icebreaker activities']
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a'
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Enhance shared spaces and grow more visually impactful and rich with each participant interaction' },
            { text: 'Generate data visualizations and insights that can be shared during the event or afterwards' },
            { text: 'Add value to your program with designs customized to your event themes and key topics' }
          ]
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: 'The session is organized around a set of multiple-choice sorting questions to be posed to the participants – one question per round. Each question will have four possible responses – color-coded to the four flags that participants choose from to signal their response each round. After they have chosen their response flag colors, participants move about the room and form small groups with the same / different colors to set up distinct response matches.In their small groups, participants share & elaborate responses or address additional themes with their new connections.',
          imageUrl: 'https://s3-alpha-sig.figma.com/img/986b/a2fc/ad1991b5f020203bb9bce561c17a44cc?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Zn51ddgRko14cJuu8h7XOa12FmTfT4CrbVsNRkHwtijsrPZYs4xNloq05Qit8s2TKz23Co9w-tLBtG8MglykBqjIKup9onQ3BlJFU2RNc~0nn9oLCNJhTNt0r4ikFoWdboyCIwiR3Po8pyBuQq4y7TjdY55j-69MnP0nYNsehBvYsha9MlYjcGx-9tuwCakh2VVtoU7rogPASb3a32J-Wc5g4iSBTiLOARMsgll5-QwbvJstKZj6SN7Z5RgodOQ~lDGOqDFc3btsmD0pH2nOGNfnnMAxfRXJnX0fqy9UZ5G80AiSuQBKoLT8zn0ADicWQejPH~bPSx-5MOwhCZHDMg__'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://s3-alpha-sig.figma.com/img/7566/5cc1/e0e237f575b29902dacb74adc7f3161f?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=rBAjsGzPFlweXuQdPJebwQa-o-d7taHL~ycJToAzjLBdUV4dMmZzJKlN3nKxla9dufBC3nEz1P4FwQ83MyfDLM3o3BZhp4TekbQrKnGvMKlwdKu6tL46SWHbQhrbpoG~Iu83gZ-ktJTtySDySxPNEEYr-GGaMFGmVjsl6kawtdOKTOcHHIA6KmGiOvcnsj6Z3mXNga0Qu1FnBj98YKgUyJLIKk13kWIGNP3e~KHQ1sVCsbwyhw31OIYCC7NXmxvvuZaiL5lVtYvYhAVq8R6VuhGCxBh-GfjnwzlIpmQP9C2hZFJL9vCMhBu6PpPo8Meu-8eOQpfnMu-OLesimO~bdw__',
          objectives: [
            'Facilitate peer networking and knowledge sharing aligned with key themes',
            'Set the tone for an interactive and conversational experience',
            'Connect people outside of established organizational units / teams / silos',
            'Emphasize the importance of building diverse teams'
          ]
        }
      },
      {
        type: 'video',
        content: {
          videoUrl: 'https://www.youtube.com/embed/9nlyM-aAfrc?si=jAg4LeooyFUvvB88',
          title: 'How we Prepare This Experience',
          highlightWords: ['How', 'This'],
          description: 'Ad scelerisque a arcu dis platea tristique class parturient parturient volutpat nisi dictum gravida scelerisque vestibulum. Dis dolor elit facilisi morbi adipiscing ad eros dapibus ante condimentum a tempus pretium a erat leo scelerisque adipiscing a.'
        }
      },
      { 
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'Lorem Ipsum this is sample data gathered from this experience. This describes the types of information we can collect from this experience and alludes to a post-event package. ',
          imageUrl: '/public/images/Projectory_Website_PostEvent.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://s3-alpha-sig.figma.com/img/3497/4e11/517dab1cdbd874a31437ce787f593bd3?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=dM-HRIZDl8qetIS8YAmMiZ0A3wlPJqv8qR8iP~tXuZ3iSkqXH76AwoHEQm7oTIczfp2odXvLUjrI9pZgUJ2DhOl8Xn-DRYNEeor3vCJclDECk27Ktiuqbfg6jLVxJ5qZ13mNm2j8W74~7rQ08Y~DEijX06wcfMKeL19odvziegVM6Y8k-BiNPoU6QlDYC59S6G-lgN1QpdPwgzFLCWRlSck5Gcwo5ZVLSfOKEZE~x3CuP5VUUHfW-9Znq7UG9p7Ik0FZXF1GHYMEWX9B1bnvoEdMG1KrTSpq2p0hMSYuqNq-IKAyXJEf6sax5nM7lVIqcSQMhpipiPOv-3MK9x7QiQ__'
        }
      },
      {
        type: 'testimonialSizzle',
        content: {
          videoSrc: 'https://www.youtube.com/embed/9nlyM-aAfrc?si=jAg4LeooyFUvvB88', // Replace with actual video ID
          quote: 'Projectory helped bring our conference to life. As soon as I heard they took the analog experience and could make it read out results for us, I was blown away.',
          author: 'Sandy Sharman',
          role: 'Group Head, People Culture & Brand, CIBC'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Basic',
              price: '99',
              description: 'Lorem ipsum dolor sit amet dolor sit consectur adipiscing elit.',
              features: ['Lorem Ipsum Dolor', 'Lorem Ipsum Dolor'],
              buttonText: 'Get started'
            },
            {
              title: 'Better',
              price: '199',
              description: 'Lorem ipsum dolor sit amet dolor sit consectur adipiscing elit.',
              features: ['Lorem Ipsum Dolor', 'Lorem Ipsum Dolor', 'Lorem Ipsum Dolor', 'Lorem Ipsum Dolor'],
              buttonText: 'Get started'
            },
            {
              title: 'Best',
              price: '399',
              description: 'Lorem ipsum dolor sit amet dolor sit consectur adipiscing elit.',
              features: ['Lorem Ipsum Dolor', 'Lorem Ipsum Dolor', 'Lorem Ipsum Dolor', 'Lorem Ipsum Dolor', 'Lorem Ipsum Dolor'],
              buttonText: 'Get started'
            }
          ]
        }
      },
      { 
        type: 'case-study',
        content: {
          title: 'See it In Action',
          description: 'Learn about how this product came to life at a past event and now it played a role in a fulsome event program.',
          buttonText: 'View Full Case Study',
          buttonLink: '/case-study/floating-opinions',
          caseStudyTitle: 'Building Commitment in a Two-Day Leadership Event',
          caseStudySubtitle: 'CIBC Executive Alignment',
          caseStudyImage: 'https://s3-alpha-sig.figma.com/img/f1bf/650c/01c0bb4294b3954a8be0e9b277d0a9e7?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PuvmpHqMAlD6as~20PKlnGLsdi3Z~31onepRTbU4hWjSothUyRXCRO3qYRmJYE59C45OwsqApwK1FFOAOz4YPY5-lZXdzAHPKjRxHwrt2~0CCzXi0cebpjmQF5y3bScplCA2TeXG7N2wngWuriioq6FA-guzWctadsi4o23JkccexBE8SztdDTquCUPnFVNS6FNzPoqx2eS~B2jsptgPqT027KXHEcKrsXrnjgSXHP-~RBJfU-Y-02YyWBVXqc5xGThAcE2CDp92fBwKeH1SuNwJAXtT0N69HmXBw2w7sRlD~g-N1gEmFKCok~abWc8hasuINLYpMttjO0T7dzjDmw__'
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
          heading: 'Floating Metrics is a discussion and alignment workshop that explores big questions in a playful and inclusive way ',
          description: 'Moving between table discussions and full-room shareouts creates a lively, layered conversation and an opportunity to explore multiple perspectives on your key topics.',
          features: ['15-30 mins', 'Interactive group exercise', 'Live polling', 'Icebreaker activities']
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: '/images/birds.gif'
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Enhance shared spaces and grow more visually impactful and rich with each participant interaction' },
            { text: 'Generate data visualizations and insights that can be shared during the event or afterwards' },
            { text: 'Add value to your program with designs customized to your event themes and key topics' }
          ]
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#92C83E, #6AA84F', 
          imageUrl: '/images/testImage_1.jpg',
          objectives: [
            'Facilitate peer networking and knowledge sharing aligned with key themes',
            'Set the tone for an interactive and conversational experience',
            'Connect people outside of established organizational units / teams / silos',
            'Emphasize the importance of building diverse teams'
          ]
        }
      },
      {
        type: 'video',
        content: {
          videoUrl: 'https://www.youtube.com/embed/9nlyM-aAfrc?si=jAg4LeooyFUvvB88',
          title: 'How we Prepare This Experience',
          description: 'Ad scelerisque a arcu dis platea tristique class parturient parturient volutpat nisi dictum gravida scelerisque vestibulum. Dis dolor elit facilisi morbi adipiscing ad eros dapibus ante condimentum a tempus pretium a erat leo scelerisque adipiscing a.'
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
    thumbnail: 'https://www.figma.com/file/KDJNESzhWloPkxjuw9luf0/image/6dc172f23907292f34d16b8c86cc34921d38376a',
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
  
    sections: []
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
  
    sections: []
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
  
    sections: []
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
  
    sections: []
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
  
    sections: []
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
  
    sections: []
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

    sections: []
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
  
    sections: []
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

    sections: []
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

    sections: []
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

    sections: []
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

    sections: []
  }
];
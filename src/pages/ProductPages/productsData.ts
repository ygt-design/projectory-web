export const products = [
  {
    id: 'floating-opinions',
    name: 'Floating Opinions',
    tagline: 'A discussion and alignment workshop exploring big questions in a playful way',
    category: 'Floating',
    categoryHighlight: 'Opinions',
    categoryColor: '#BCCE2C',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457018/Floating_Opinions_IP_Website_V3_Final_Colour_Pass_m0tvdr.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457018/Floating_Opinions_IP_Website_V3_Final_Colour_Pass_m0tvdr.mp4',
    tags: ['Peer learning', 'Explore priorities', 'Ideas to action'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648933/455278554_1037606311699335_4372730795563401026_n_soow52.webp',
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
          heading: 'FloatingOpinions is an inclusive discussion and alignment session that playfully smuggles in elements of surprise and delight. Participants explore a series of big questions connected to event themes and content with their table groups and then signal their positions to the rest of the room by raising and lowering balloons – creating a stunning visual to accompany a facilitated shareout of different perspectives.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648958/FM8A5082-Enhanced-NR_obbr37.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: 'Event organizers select discussion questions in advance, each with multiple response options. After each question is introduced, table groups quickly discuss and align on their preferred response. Then, each table uses a special device to signal a response by raising or lowering a balloon, creating a striking visualization across the room as dozens of balloons lift in unison.<br /> <br />The facilitator then prompts participants from different tables to share their perspectives. Moving between table discussions and full-room shareouts creates a lively, layered conversation and an opportunity to explore multiple perspectives on key topics.',
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648940/455094406_1037605398366093_156739667913828633_n_zywn0z.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648937/FM8A5132-Enhanced-NR_j82lnq.webp',
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
      //     caseStudyImage: ''
      //   }
      // }
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648961/455326506_1037605838366049_220134298242251458_n_bnwkuo.webp'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '9,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '13,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457021/Flag_Finder_Website_IP_V4_leeta4.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457021/Flag_Finder_Website_IP_V4_leeta4.mp4',
    tags: ['Networking', 'Peer learning', 'Visualize insights'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649300/P1013739_ebvd2m.webp', 
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
        "Mixed/Other",
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
          heading: 'FlagFinder is a playfully energizing networking and discussion session that promotes purposeful mixing and re-mixing of participants while also creating real-time, color-coded visualizations of opinions, attitudes, and sentiments in the room.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649307/JLAR1846_mffgxr.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The session is organized around a set of multiple-choice sorting questions to be posed to the participants – one question per round. Each question will have four possible responses – color-coded to the four flags that participants choose from to signal their response each round. After they have chosen their response flag colors, participants move about the room and form small groups with same / different colors to set up distinct response matches.<br /><br />In their small groups, participants share & elaborate responses or address additional themes with their new connections.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649297/P1013798-Enhanced-NR-Edit_i2wgkd.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649327/Lifemark_b_323_dejffh.webp',
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
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649350/WMG1252_comue2.webp'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '7,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '10,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    categoryColor: '#FF4A78',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457030/Align_by_Line_Website_IP_V5_Final_Colour_Pass_nzfmxp.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457030/Align_by_Line_Website_IP_V5_Final_Colour_Pass_nzfmxp.mp4',
    tags: ['Peer learning', 'Build alignment', 'Reflect & synthesize'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746630383/1732132444884_tgvvql.webp',
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
        "Mixed/Other",
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
          heading: 'AlignByLine is a reflection and synthesis session that takes the simple mechanism of a fill-in-the-blank game and turns it into the foundation of a highly entertaining, conversational workshop designed to build alignment and a shared story about the event journey and the road ahead.',

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
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746630383/1732132444884_tgvvql.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The session is built around a physical wall of text that is missing critical pieces – literal blank spaces to be filled with blocks of text determined by the participants. As the facilitator guides the room through the fill-in-the-blank text – which becomes the basis of a “shared narrative” about the event journey, key takeaways, next steps, etc. – table groups are prompted to nominate contributions to complete the story.<br /><br />For each blank, the facilitator leads a shareout, offering an opportunity for participants to exchange perspectives and engage in friendly debate about implementation and action until the narrative and synthesis are complete.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746630385/Lifemark_333_gzvroa.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746630380/Lifemark_306_pxsofj.webp',
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
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746630383/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-0898_xjdz3z.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '8,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '12,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Combo_Convo_Website_IP_V3_ijjncg.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Combo_Convo_Website_IP_V3_ijjncg.mp4',
    tags: ['Networking', 'Inspire creativity'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649932/d0fd6bbe-969a-4e6c-a1ae-84fa460b2950_ybgiyf.webp',
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
        "Mixed/Other",
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
          heading: 'ComboConvo is an energizer and creative juicer built around an adaptable set of prompt cards. The session can be run just as a quick energizer or as a full game with elements of networking and competition that can be tailored to objectives, available time, etc.<br /><br />Each card-based interaction creates a unique prompt that will get participants thinking, chatting, collaborating, and laughing. ComboConvo can be played by small groups at tables or scaled up for large audiences by leveraging event apps etc',

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
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649923/IMG_7571_whdfmw.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "ComboConvo is designed around an adaptable set of combination prompt cards that can be tailored to event content and themes. The basic interaction involves participants matching pairs of cards to create unique prompt questions and then riffing on creative responses. <br /><br />The game works wonderfully as a quick energizer to warm a crowd, but it can also be built up with additional elements of competitive game play and networking or integrated with an event app or (in the Plus version) an interactive installation for capture and display of responses. ",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649929/15fd6b1c-07e8-4d24-aa0e-7fc510b095fe_llxx6k.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649926/43b67eba-3fab-4ac6-9987-776820974e30_epwcdk.webp',
          objectives: [
            'Foster connection and networking',
            'Inspire forward thinking and creativity',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746649932/d0fd6bbe-969a-4e6c-a1ae-84fa460b2950_ybgiyf.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '4,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '9,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
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
    categoryColor: '#ff7700',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Futures_Web_Website_IP_V3_Final_Colour_Pass_rznkhr.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Futures_Web_Website_IP_V3_Final_Colour_Pass_rznkhr.mp4',
    tags: ['Visualize insights', 'Explore priorities', 'Reflect & synthesize'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648522/DZ9_9385_kgsqlo.webp',
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
          heading: 'FuturesWeb is an interactive installation that helps attendees engage with key content and themes as participants while also learning about the perspectives and priorities of the cohort at large. Each new interaction adds another thread to an emerging picture of the group.',

          features: ['Interactive installation', 'Self-guided with instructions', 'Highly customizable', 'Adaptable to any floor plan', 'Available as a standalone rental']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Activates an informal space' },
            { text: 'Creates a striking physical data visualization'},
            { text: 'Generates rich post-event output'}
          ]
        }
      },
      {
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648537/cma_conference4942_copy_efeqlj.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a series of multiple choice questions aligned with program content and chosen to allow participants to share perspectives, opinions, and priorities. Each question is represented with a post featuring pegs that correspond to potential answer choices. Participants work from post to post threading a color-coded strand of yarn around the pegs that reflect their responses. <br /> <br />With every new interaction, the woven picture grows richer and more illuminating. Patterns and insights from the resulting web can be brought back to plenary sessions or digitized and reported out post event.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648527/FM8A4586-Enhanced-NR_qu1xf4.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648534/IMG_8935_yund1a.webp',
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
          description: 'FuturesWeb functions as a thematically aligned, anonymized five-question survey of attendee opinions and priorities. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771328/Projectory_FuturesMap_RoboAdvisors_WealthManagement_fuehda.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648532/FM8A5399_o2ecms.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '8,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '13,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457033/If_This_Then_What_Website_IP_V3_Final_Colour_Pass_u1vuvb.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457033/If_This_Then_What_Website_IP_V3_Final_Colour_Pass_u1vuvb.mp4',
    tags: ['Inspire creativity', 'Explore priorities', 'Peer learning', 'Ideas to action'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648102/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-09342_yujk0f.webp',
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
          heading: 'IfThis…ThenWhat? is Projectory’s adaptation of a classic strategic foresight tool called the Futures Wheel. The exercise is designed to explore the potential ripple effects of a specific trend, event, or decision. Working in groups, participants envision cascading implications and knock-on effects to map out a range of possible futures full of opportunities, risks, and unintended consequences.',

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
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648102/2024_11_13_Event_Marketer_Agency_Forum_at_Dream_Hotel_by_Alex_Markow-09342_yujk0f.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The workshop begins with a simple canvas and a set of trends or developments of interest. These can be selected in advance or identified by participants as an initial step in the workshop. In conversation at their tables, participants explore the cascading implications of their chosen topic, mapping out ripple effects with a specific focus on identifying new opportunities and emerging risks. Then, the groups work backward – asking what specific actions could be taken today in light of the opportunities and risks they’ve surfaced. The session ends with a facilitated shareout.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648109/IMG_7345_fq5k9i.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648107/FM8A5496_vpcrh2.webp',
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
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771327/Projectory_FuturesMap_AI_SupportCompliance_zfd9hy.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746648104/JGF_7547r_rvg8wj.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '4,500',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '8,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457033/Learning_Action_Matrix_Website_IP_V3_Final_Colour_Pass_nz91af.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457033/Learning_Action_Matrix_Website_IP_V3_Final_Colour_Pass_nz91af.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize', 'Peer learning'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647935/JGF_7470r_sjesc0.webp',
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
          heading: 'The LearningActionMatrix is a simple, intuitive framework designed to support more effective conversations following up, unpacking, and/or synthesizing information-dense sessions or keynotes. The value of the session emerges as participants discover dynamic links between the insights gained and the related actions to be taken - which, in turn, will yield future insights through further learning.',

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
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647935/JGF_7470r_sjesc0.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The workshop leverages a simple framework built to consolidate learning through conversation and then connect it to post-event action. After a quick intro to the LAM canvas, most of the session is devoted to small group work, followed by a round of facilitated share-outs. In their groups, participants work through four interrelated categories - identifying key insights, questions, actions to be taken to implement new learnings or deepen understanding. The workshop results in a detailed set of learning-action plans and a rich set of outputs to drive the post-event agenda.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647937/JGF_7489r_qx9xkl.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647926/JGF_7446r_shsxiw.webp',
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
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771327/Projectory_FuturesMap_AI_DigitalAssistants_diavvo.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647929/1732132446269_jevdgh.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '4,500',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '8,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457020/Ping_Pong_Poll_Website_IP_V4_Final_Colour_Pass_firees.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457020/Ping_Pong_Poll_Website_IP_V4_Final_Colour_Pass_firees.mp4',
    tags: ['Visualize insights', 'Explore priorities', 'Reflect & synthesize'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647278/DZ9_7612_uqsjdg.webp',
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
          heading: 'PingPoll is an interactive installation that invites event attendees to weigh in on any content, theme, or question that can be voted or ranked. It provides an easy way to activate an informal space with a playful data visualization that creates a snapshot of group priorities and perspectives.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647278/DZ9_7612_uqsjdg.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around up to four related questions – anything that attendees can answer by voting among, ranking, or prioritizing response choices.  For each question, response choices are represented with tubes into which participants drop color-coded ping pong ball votes. As votes are cast, tubes corresponding to favored responses fill up, creating a visualization that can easily be digested at a glance. <br /><br />The simple design allows for a surprising number of configurations and yields quick data to be fed back into plenary sessions or synthesized for a post-event report.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647280/DZ9_7605_cuwbrc.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647282/430022990_823463609811061_2831339669744667382_n_1_bfigk6.webp',
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
          description: 'PingPoll works fantastically as an at-a-glance snapshot of attendee priorities and perspectives. The installation is also supported with custom slides that can be integrated into a deck for a quick shareout in a plenary session. Alternately, the full set of votes can be tabulated and analyzed after the event for inclusion in a follow-on report.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771326/Projectory_FuturesMap_AI_ChatbotsCustomerService_V2_uhijpi.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746647298/32BB04E7-F947-4790-8384-6A81602305E0_qobqd6.webp'
        }
      },
      { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '7,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '10,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
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
    categoryColor: '#FF4A78',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457025/Priority_Pathways_Website_IP_V3_Final_Colour_Pass_zo2izi.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457025/Priority_Pathways_Website_IP_V3_Final_Colour_Pass_zo2izi.mp4',
    tags: ['Visualize insights', 'Explore priorities', 'Build alignment'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746633354/Deloitte-June19th2024-0262_websize_pfipae.webp',
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
          heading: 'PriorityPathways is an interactive installation that supports attendee engagement with key content and themes using dot voting across 2x2 matrices and Likert/slider-type scales to explore sentiments, priorities, etc. The design is highly adaptable, creates an attractive data visualization in physical space, and works well as a self-guided interaction.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746633354/Deloitte-June19th2024-0262_websize_pfipae.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a series of questions or prompts that are aligned with program content and chosen to allow participants a chance to share perspectives, opinions, and priorities. The questions are mapped onto 2x2 matrices and/or Likert or slider-type scales, and participants are invited to register responses via color-coded dot voting. <br /> <br />With every new response, the picture grows richer and more illuminating as a visualization of participant input emerges in physical space. Patterns and insights from the resulting visualization can be brought back to plenary sessions or digitized and reported out post event.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746633355/IMG_0527_szhoc0.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746633351/IMG_0537_msxfy3.webp',
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
          description: 'PriorityPathways functions as a thematically aligned, anonymized survey of attendee opinions and priorities. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771328/Projectory_FuturesMap_RoboAdvisors_WealthManagement_fuehda.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746633352/Deloitte-June19th2024-0261_websize_xiiy7k.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '7,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '9,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
            }
          ]
        }
      }
    ]
  },
  {
    id: 'reflection-collection',
    name: 'Reflection Collection',
    tagline: 'A reflection activity that brings attendees into the conversation',
    category: 'Reflection',
    categoryHighlight: 'Collection',
    categoryColor: '#EEDA2A',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457031/Reflection_Collection_IP_Website_V4_Final_Colour_Pass_lkyxp8.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457031/Reflection_Collection_IP_Website_V4_Final_Colour_Pass_lkyxp8.mp4',
    tags: ['Explore priorities', 'Reflect & synthesize'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632826/Lifemark_b_691_hpg3p6.webp',
    shortDescription: 'A reflection activity that brings attendees into the conversation',

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
          heading: 'The ReflectionCollection is a card-based installation designed to encourage, capture, and showcase attendee contributions – turning event attendees into active participants in an ongoing exchange of perspectives on program themes and content. <br /> <br /> As the Collection grows, it becomes a powerful and accessible site for attendees to draw inspiration from peers and colleagues. It also activates an informal space and provides an easy engagement or check-in that can be brought into main stage sessions or breakouts.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632826/Lifemark_b_691_hpg3p6.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a set of prompt cards featuring up to five pre-determined reflection prompts. Ideally, these are passed out in the main room or breakouts, creating a moment that can also be used for synthesis conversations and forming new connections.<br /><br />After participants briefly address the reflection prompts, they’re invited to visit the installation to see what their colleagues and peers have contributed. As the Collection fills in, it becomes an increasingly rich source of bold ideas, big questions, and valuable insights that can be fed back into plenary sessions or synthesized for a post-event report.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632821/Lifemark_b_52_fkeart.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632822/IMG_6028_k4xvqx.webp',
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
          description: 'ReflectionCollection functions during the event as a physical site of inspiration and exchange. The installation is also supported with custom slides that can be integrated into a deck for a quick shareout in a plenary session. And when the event concludes, all cards can be digitized and analyzed for a follow-on synthesis report.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771327/Projectory_FuturesMap_AI_SupportCompliance_zfd9hy.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632828/1723554227767_mhebln.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '9,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '13,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457038/Taking_Action_Website_IP_V3_ylvoua.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457038/Taking_Action_Website_IP_V3_ylvoua.mp4',
    tags: ['Ideas to action', 'Reflect & synthesize', 'Build alignment'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632158/exported_7823F1B9-022A-4F37-9732-CAC3D7ED090F_goygfn.webp',
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
        "Mixed/Other",
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
          heading: 'TakingAction is designed to build alignment on next steps and a shared sense of purpose, momentum, and clear accountability. Most events end on an energetic high note… and then fail to translate that energy into meaningful action. This session ensures that participants identify and own the next steps – and that they’ll move forward together.',

          features: ['Facilitated session', '35 - 60 min', 'Main stage', '40 - 500 participants', 'Requires table seating ']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as a closing session with a focus on next steps and accountability' },
            { text: 'Generates rich post-event output'},
            { text: 'Can be simplified to adapt to shorter duration and/or theater seating ' }
          ]
        }
      },
      { 
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632158/exported_7823F1B9-022A-4F37-9732-CAC3D7ED090F_goygfn.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The TakingAction session (typically programmed at the end of an event) blends facilitated reflection, a card-based interaction, and a creative canvas to align individual commitments with a set of high-value organizational or cohort-level objectives. <br /><br /> The workshop starts with a high-level collective prompt sourced from the client and asks participants to each identify a clear, critical collective commitment to be made. Those collective commitment ideas are then shuffled, assessed, and ranked, with the top 5 to be shared aloud.<br /><br /> After these top collective commitments are identified, the participants are asked to make personal commitments to concrete actions that will support the group's high-priority collective commitments. These are captured in a creative canvas to be digitized and leveraged post-event to support accountability and real action toward organizational goals.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632171/FM8A5707-Enhanced-NR_c5yjd3.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632160/455243422_1037697441690222_414058858109471329_n_bpzvx6.webp',
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
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771327/Projectory_FuturesMap_AI_DigitalAssistants_diavvo.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746632159/FM8A5679_ty8vik.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '4,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '8,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457032/Vision_Forest_Website_IP_V5_Final_Colour_Pass_qm3teo.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457032/Vision_Forest_Website_IP_V5_Final_Colour_Pass_qm3teo.mp4',
    tags: ['Reflect & synthesize', 'Visualize insights'],
    thumbnail: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746631571/FM8A4743-Enhanced-NR_1_swnkt5.webp',
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
          heading: 'VisionForest is an interactive installation that brings attendees into the conversation at the level of inspiration - inviting them to share future visions, hopes/fears, statements of mission/purpose, or other sentiments that align with program themes. The collected contributions are showcased spatially in a dense "forest" of hanging ribbons that attendees can explore throughout the program.',

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
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746631571/FM8A4743-Enhanced-NR_1_swnkt5.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "The installation is designed around a prompt (or several) chosen to align with key event content and themes — often at a high level that helps to frame the overall experience. Attendees can be invited to weigh in pre-program, at registration, following a main stage session, or during breaks, and as they share their visions, concise statements of purpose, hopes/fears, etc., those sentiments are captured and showcased in an installation that becomes a source of interest and inspiration in an informal space. <br /><br /> The 'forest' is highly photogenic and can also provide rich material that's easily woven back into main stage or breakout sessions.",
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746631568/FM8A4480_zba8sl.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746631566/FM8A4417-Enhanced-NR_jqxd4i.webp',
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
          description: 'VisionForest allows event organizers to pose one big question to attendees for anonymous response and display in the installation. All responses can be digitized, analyzed, and shared in post-event reports.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771326/Projectory_FuturesMap_AI_ChatbotsCustomerService_V2_uhijpi.png'
        }, 
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dazzkestf/image/upload/v1746631572/FM8A5173-Enhanced-NR_1_h64pkz.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Bring us in',
              price: '23,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
            }
          ]
        }
      }
    ]
  },
  {
    id: 'block-party',
    name: 'Block Party',
    tagline: 'A collaborative quiz game with towering stakes',
    category: 'Block',
    categoryHighlight: 'Party',
    categoryColor: '#F37655',
    heroVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Block_Party_Website_IP_V4_Final_Colour_Pass_rynhdv.mp4',
    bgVideo: 'https://res.cloudinary.com/dazzkestf/video/upload/v1746457037/Block_Party_Website_IP_V4_Final_Colour_Pass_rynhdv.mp4',
    tags: ['Networking', 'Peer learning'],
    thumbnail: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420077/BlockParty3_myndnf.webp',
    shortDescription: 'A collaborative quiz game with towering stakes',
  
    filters: {
      "type": [
        "Facilitated session"
      ],
      "objectives": [
        "Foster connection and networking",
        "Facilitate peer learning and dialogue"
      ],
      "seating": [
        "Mixed/Other",
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
          heading: 'BlockParty is a high energy, collaborative quiz game with a block-stacking twist. Participants work in teams to answer trivia questions drawing on event themes and content. For each correct answer, a team gets to add a block to their tower, but as the game continues and the towers grow taller, the blocks get larger – and the stakes, higher. Towers topple, leads vanish, and the game often comes down to the very last round or even a wild tiebreaking challenge.',

          features: ['Facilitated session', '45 - 75 min', 'Main stage', '50 - 500 participants', 'Reauites table seating']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal for receptions and networking time' },
            { text: 'Highly customizable to event themes and content'},
            { text: 'Energizes a room with movement'}
          ]
        }
      },
      { 
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420077/BlockParty2_pkebn7.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "BlockParty is Projectory's spin on a quiz game session. That means it's not *just* trivia. There are additional elements of physical play and collaboration to heighten the drama and the fun. <br /><br />Participants compete in teams to answer trivia questions designed with event organizers to test knowledge and highlight key content and themes. For each correct answer, a team adds a new block to their tower, and at the end of each round, teams with taller block towers are awarded more points. The twist? The taller the tower, the easier to topple. Commanding leads can vanish in an instant. This keeps the energy high, and the game close. Ties are broken with wild challenges using the blocks in unexpected – and humorous – ways.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420078/BlockParty4_jhevzk.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420077/BlockParty3_myndnf.webp',
          objectives: [
            'Foster connection and networking',
            'Inspire forward thinking and creativity',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420077/BlockParty1_zix2dw.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '7,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '10,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
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
    tagline: 'A playfully strategic decision-making & prioritization workshop',
    category: 'PointingThe',
    categoryHighlight: 'Way',
    categoryColor: '#BCCE2C',
    heroVideo: 'https://res.cloudinary.com/dduchyyhf/video/upload/v1747764986/Pointing_the_Way_Web_IP_V2_zylilh.mp4',
    bgVideo: 'https://res.cloudinary.com/dduchyyhf/video/upload/v1747764986/Pointing_the_Way_Web_IP_V2_zylilh.mp4',
    tags: ['Explore priorities', 'Peer learning', 'Build alignment'],
    thumbnail: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420797/PointingtheWay1_r4foy4.webp',
    shortDescription: 'A playfully strategic decision-making & prioritization workshop',
  
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

    sections: [
      { type: 'hero' },
      { 
        type: 'details', 
        content: {
          heading: 'PointingTheWay is an interactive and conversational workshop that drops participants into a pre-designed scenario specially calibrated to help them explore a series of relevant and interrelated strategic questions from multiple stakeholder perspectives. Imagine a collaborative Choose Your Own Adventure situation created just for your org and event, and you will have the right idea.',

          features: ['Facilitated session', '45 - 75 min', 'Main stage or breakout', '50 - 400 participants', 'Best for table seating']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Promotes communication beyond silos and established teams' },
            { text: 'Highly customizable to specific contexts and themes'},
            { text: 'Can be designed to incorporate and leverage internal experts'}
          ]
        }
      },
      { 
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420796/PointingtheWay2_gk3vfq.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "PointingTheWay is a strategic decisions and prioritization workshop built with a pre-determined scenario and set of roles selected to help participants explore a series of relevant questions in a Choose Your Own Adventure-type format. Once the context is established, table groups are assigned stakeholder roles and presented with a series of choices to make.<br /> <br />Each choice, made with weighting that might favor particular stakeholders, moves the session and story forward. Participant groups rotate through roles in the scenario to inhabit multiple stakeholder perspectives as they navigate the scenario and discuss, debate, and ultimately decide which path to take.",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420797/PointingtheWay1_r4foy4.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420796/PointingtheWay4_ddi9a8.webp',
          objectives: [
            'Explore strategic priorities and decisions',
            'Facilitate peer learning and dialogue',
            'Build alignment and consensus',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747420796/PointingtheWay3_utibyr.webp'
        }
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '8,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '12,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
            }
          ]
        }
      }
    ]
  },
  {
    id: 'combo-convo-plus',
    name: 'Combo Convo +',
    tagline: 'A wild idea-generating, networking, and conversation mash-up PLUS an interactive installation',
    category: 'Combo',
    categoryHighlight: 'Convo+',
    categoryColor: '#2BDCB7',
    heroVideo: 'https://res.cloudinary.com/dduchyyhf/video/upload/v1747835988/comboConvo_compressed_jwsrmg.mp4',
    bgVideo: 'https://res.cloudinary.com/dduchyyhf/video/upload/v1747835988/comboConvo_compressed_jwsrmg.mp4',
    tags: ['Networking', 'Inspire creativity', 'Visualize insights'],
    thumbnail: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747835987/c1172d47-149f-4e08-a47e-f697753f3d08_dezcf2.webp',
    shortDescription: 'A wild idea-generating, networking, and conversation mash-up PLUS an interactive installation',
  
    filters: {
      "type": [
        "Facilitated session",
        "Interactive installation",
      ],
      "objectives": [
        "Foster connection and networking",
        "Inspire forward thinking and creativity",
        "Visualize collective insights"
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
          heading: 'The networking and conversation game our clients know and love PLUS an eye-catching interactive installation... <br><br> ComboConvo is an energizer and creative juicer built around an adaptable set of prompt cards. The interaction can be run just as a quick energizer or as a game with elements of networking and competition that can be tailored to objectives, available time, etc.<br><br> Each card-based interaction creates a unique prompt that will get participants thinking, chatting, collaborating, and laughing. ComboConvo can be played by small groups at tables or scaled up for large audiences by leveraging event apps, etc. The Plus version adds an interactive installation to keep the game going and the ideas flowing into breaks and beyond.',

          features: ['Facilitated session + Interactive installation', '15 - 30 min', 'Main stage or breakout', '50 - 4000 participants', 'Works for any seating']
        }
      },
      { 
        type: 'grid',
        content: {
          items: [
            { text: 'Ideal as an icebreaker or networking game'},
            { text: 'Can feed into an event app'},
            { text: 'Highly customizable to event themes and content '}
          ]
        }
      },
      { 
        type: 'image',
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747835987/54a1d7e1-5ca5-4eec-af66-7d3b26449d9e_fgs5lq.webp'
        }
      },
      { 
        type: 'how-it-works',
        content: {
          title: 'How it Works',
          description: "ComboConvo is designed around a set of combination prompt cards that can be tailored to event content and themes. The basic interaction involves participants matching pairs of cards to create unique prompt questions and then riffing on creative responses. <br /><br />The game works wonderfully as a quick energizer to warm a crowd, but it can also be built up as a full session with additional elements of competitive game play and networking. In the Plus version, participant responses are displayed on an eye-catching installation that can be visited and reviewed during breaks, receptions, etc. Attendees can get inspired and vote for their favorite (or funniest / most creative / most clever) responses with overall winners to be announced later in the event. ",
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747835987/IMG_8966_c95gd0.webp'
        }
      },
      { 
        type: 'objectives',
        content: {
          title: 'Objectives',
          titleColor: '#BCCE2D, #148771', 
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747835987/IMG_8954_sxhg8k.webp',
          objectives: [
            'Foster connection and networking',
            'Inspire forward thinking and creativity',
            'Visualize collective Insights',
          ]
        }
      },
      { 
        type: 'image', 
        content: {
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747835987/IMG_8971_utnz4r.webp'
        }
      },
      {
        type: 'dataFeature',
        content: {
          title: 'Data Gathering',
          description: 'ComboConvo responses are collected in a Projectory webform before they are displayed on the installation. After the event, organizers can access a spreadsheet with hundreds of wild ideas from their attendees to inspire more creative riffing, potential experiments, and follow-on communications.',
          imageUrl: 'https://res.cloudinary.com/dduchyyhf/image/upload/v1747771326/Projectory_FuturesMap_AI_ChatbotsCustomerService_V2_uhijpi.png' 
        },
      },
       { 
        type: 'pricing',
        content: {
          plans: [
            {
              title: 'Do it yourself',
              price: '8,000',
              description: 'For teams that want to run it themselves, but still feel supported.',
              features: [
                  'Rent-and-run toolkit',
                  'Explainer videos & setup guide',
                  'Remote support',
                  'Slides and facilitation guide',
                  'Shipment coordination'
                ] 
            },
            {
              title: 'Bring us in',
              price: '12,000',
              description: 'For teams who want a turnkey experience, delivered seamlessly by our team.',
              features: [
                'End-to-end production and delivery',
                'Onsite facilitator and support',
                'Live collaboration with your team',
                'White-glove logistics management',
                '24/7 dedicated account manager'
              ]               
            },
            {
              title: 'Ask us about',
              price: 'Add-ons',
              description: 'More ways to personalize your high-impact Projectory experience',
              features: [
                'Theming and content integration',
                'Run-of-show engagement design',
                'Custom content and branding',
                'Interactive post-event report',
                'Projectory as your event host'
              ]                    
            }
          ]
        }
      }
    ]
  }
];

// STORY DATA - Visual Novel Style
// Import your background images and item assets here
import hospitalBg from '../../assets/scenes/bg0.png';
import bg2 from '../../assets/scenes/bg1.jpg';

export const STORY_DATA = {
  // ==================== CHAPTER 1: AWAKENING ====================
  chapter_1_start: {
    id: 'chapter_1_start',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "You wake up in a dimly lit room. The air is thick with the smell of decay and antiseptic."
      },
      {
        speaker: "You",
        text: "Ugh... my head... What happened to me?"
      },
      {
        speaker: null,
        text: "Your vision is blurry. You try to move, but your body feels heavy, unresponsive."
      },
      {
        speaker: "You",
        text: "Where... where am I? This place..."
      },
      {
        speaker: null,
        text: "Slowly, memories begin to surface. Fragmented. Unclear. Like pieces of a shattered mirror."
      },
      {
        speaker: "You",
        text: "I remember... white walls. Bright lights. People in lab coats staring at me..."
      },
      {
        speaker: "Voice in Distance",
        text: "Help... someone... please help me..."
      },
      {
        speaker: "You",
        text: "What?! Who's there?!"
      },
      {
        speaker: null,
        text: "The voice fades into silence. The only sound now is your own ragged breathing."
      },
      {
        speaker: "You",
        text: "I need to get out of here. I need to find answers."
      },
      {
        speaker: null,
        text: "As your eyes adjust to the darkness, you notice two things: a faint light coming from under a door, and a small table beside your bed."
      }
    ],
    
    choices: [
      {
        text: "Check the table first before leaving",
        hint: "Be thorough",
        sanityChange: 5,
        giveItem: {
          id: 'flashlight',
          name: 'Flashlight',
          icon: '🔦',
          description: 'An old but functional flashlight. Provides light in dark areas.',
          consumable: false
        },
        nextScene: 'chapter_1_corridor'
      },
      {
        text: "Head directly to the door",
        hint: "Move quickly",
        sanityChange: 0,
        nextScene: 'chapter_1_corridor'
      }
    ]
  },

  chapter_1_corridor: {
    id: 'chapter_1_corridor',
    background: bg2,
    
    dialogues: [
      {
        speaker: null,
        text: "You step into a long, narrow corridor. The walls are stained and peeling, covered in strange markings."
      },
      {
        speaker: "You",
        text: "This place... it feels familiar somehow. But I can't remember why."
      },
      {
        speaker: null,
        text: "Your footsteps echo in the empty hallway. Each step feels heavier than the last."
      },
      {
        speaker: "Dr. Williams (Recording)",
        text: "*static* ...Day 45 of the experiment. Subject 7 is showing remarkable resistance to the conditioning..."
      },
      {
        speaker: "You",
        text: "A recording? Subject 7... why does that sound so familiar?"
      },
      {
        speaker: "Dr. Williams (Recording)",
        text: "*static* ...unlike the previous subjects, this one retains fragments of memory even after the procedure..."
      },
      {
        speaker: "You",
        text: "Previous subjects? What kind of place is this?!"
      },
      {
        speaker: null,
        text: "Suddenly, you hear footsteps. Not your own. Someone else is in this corridor."
      },
      {
        speaker: "Sarah",
        text: "Stop! Don't go any further!"
      },
      {
        speaker: "You",
        text: "Who are you?! Show yourself!"
      },
      {
        speaker: null,
        text: "A woman emerges from the shadows. She looks exhausted, her clothes torn and dirty."
      },
      {
        speaker: "Sarah",
        text: "My name is Dr. Sarah Chen. I used to work here as a researcher."
      },
      {
        speaker: "You",
        text: "Used to? What happened here?"
      },
      {
        speaker: "Sarah",
        text: "This facility... it was supposed to be a psychiatric research center. But Dr. Williams, he turned it into something else."
      },
      {
        speaker: "You",
        text: "Dr. Williams... I heard his voice in that recording."
      },
      {
        speaker: "Sarah",
        text: "He's obsessed with mind control, memory manipulation. I tried to stop him, but..."
      },
      {
        speaker: null,
        text: "She looks away, her expression filled with regret."
      },
      {
        speaker: "Sarah",
        text: "I was too late. The other subjects... they're all gone now. Lost to the experiments."
      },
      {
        speaker: "You",
        text: "Other subjects? Then... am I...?"
      },
      {
        speaker: "Sarah",
        text: "Yes. You're Subject 7. The only one who survived intact... so far."
      },
      {
        speaker: "You",
        text: "No... that can't be true..."
      },
      {
        speaker: "Sarah",
        text: "I know this is hard to accept. But if you want the truth, if you want to escape this nightmare, you need to reach the laboratory on the third floor."
      },
      {
        speaker: "You",
        text: "The laboratory... what will I find there?"
      },
      {
        speaker: "Sarah",
        text: "Your past. Your identity. Everything Dr. Williams took from you."
      }
    ],
    
    choices: [
      {
        text: "Trust Sarah and ask her to come with you",
        hint: "Seek companionship",
        sanityChange: 5,
        setFlag: { trustSarah: true },
        nextScene: 'chapter_2_together'
      },
      {
        text: "Go to the laboratory alone",
        hint: "Trust no one",
        sanityChange: -5,
        setFlag: { trustSarah: false },
        nextScene: 'chapter_2_alone'
      }
    ]
  },

  // ==================== CHAPTER 2: THE TRUTH UNFOLDS ====================
  chapter_2_together: {
    id: 'chapter_2_together',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: "You",
        text: "Come with me. I don't want to do this alone."
      },
      {
        speaker: "Sarah",
        text: "Alright. But stay close. This facility is dangerous, especially at night."
      },
      {
        speaker: null,
        text: "You and Sarah walk together through the dark corridors. The silence is oppressive."
      },
      {
        speaker: "Sarah",
        text: "The stairs to the third floor are just ahead. But there's something you need to know first."
      },
      {
        speaker: "You",
        text: "What is it?"
      },
      {
        speaker: "Sarah",
        text: "Before you were Subject 7, you had a name. A life. A family."
      },
      {
        speaker: "You",
        text: "A family...?"
      },
      {
        speaker: "Sarah",
        text: "Your name is Alex. You came here six months ago as a volunteer for what you thought was a sleep study."
      },
      {
        speaker: "You",
        text: "Alex... yes... I remember now. I needed the money for my sister's medical treatment."
      },
      {
        speaker: "Sarah",
        text: "Dr. Williams saw potential in you. Instead of the sleep study, he used you for his mind control experiments."
      },
      {
        speaker: null,
        text: "More memories flood back. Your sister's smile. Your mother's worried face. Your own desperation."
      },
      {
        speaker: "You",
        text: "My sister... Emma. Is she okay? Does she know what happened to me?"
      },
      {
        speaker: "Sarah",
        text: "I don't know. But if we can get the evidence from the lab, we can expose Williams and get you home."
      },
      {
        speaker: null,
        text: "You reach the stairwell. The door to the third floor is sealed with a keypad."
      },
      {
        speaker: "John (Whisper)",
        text: "Alex... is that you?"
      },
      {
        speaker: "You",
        text: "That voice... John?"
      },
      {
        speaker: "John",
        text: "I was Subject 3. We... we were in the same group. We tried to escape together."
      },
      {
        speaker: "Sarah",
        text: "Subject 3 didn't make it. His mind... it broke during the final procedure."
      },
      {
        speaker: "John",
        text: "I'm still here, Alex. Part of me, anyway. Trapped in this place."
      },
      {
        speaker: "You",
        text: "John, I'm so sorry. I should have helped you."
      },
      {
        speaker: "John",
        text: "It's not your fault. But you can still finish what we started. The code... 1-3-7-9."
      },
      {
        speaker: "Sarah",
        text: "Those numbers... they must be the access code."
      },
      {
        speaker: "John",
        text: "Use it. End this nightmare. For all of us."
      },
      {
        speaker: null,
        text: "John's voice fades away, leaving only silence."
      }
    ],
    
    choices: [
      {
        text: "Enter the code 1379",
        hint: "Trust John's information",
        triggerPuzzle: {
          type: 'number',
          title: 'Laboratory Access',
          description: 'Enter the 4-digit access code.',
          hint: 'John said: 1-3-7-9',
          answer: '1379',
          inputType: 'number',
          maxLength: 4,
          placeholder: '____',
          maxAttempts: 3,
          reward: {
            sanityChange: 10,
            nextScene: 'chapter_3_lab_truth'
          },
          failScene: 'chapter_3_lab_fail'
        }
      }
    ]
  },

  chapter_2_alone: {
    id: 'chapter_2_alone',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: "You",
        text: "I appreciate your help, but I need to do this alone."
      },
      {
        speaker: "Sarah",
        text: "I understand. But please, be careful. Dr. Williams is still somewhere in this facility."
      },
      {
        speaker: null,
        text: "Sarah disappears into the shadows, leaving you alone in the corridor."
      },
      {
        speaker: "You",
        text: "Alone... just like always."
      },
      {
        speaker: null,
        text: "You walk through the empty hallways, your footsteps the only sound in the oppressive silence."
      },
      {
        speaker: "Dr. Williams (Echo)",
        text: "Subject 7... can you hear me?"
      },
      {
        speaker: "You",
        text: "Williams! Where are you?!"
      },
      {
        speaker: "Dr. Williams",
        text: "I'm everywhere in this facility. In the walls. In the air. In your mind."
      },
      {
        speaker: "You",
        text: "Get out of my head!"
      },
      {
        speaker: "Dr. Williams",
        text: "Do you really want to remember, Subject 7? Do you want to know what you've become?"
      },
      {
        speaker: null,
        text: "Images flash through your mind. Pain. Confusion. Needles. Bright lights."
      },
      {
        speaker: "You",
        text: "You... you did this to me. You took my memories!"
      },
      {
        speaker: "Dr. Williams",
        text: "I gave you a gift. Freedom from the pain of your past. But you're ungrateful."
      },
      {
        speaker: "You",
        text: "My past is mine! You had no right!"
      },
      {
        speaker: "Dr. Williams",
        text: "Then come to the laboratory. Face the truth. But I warn you... some truths are better left buried."
      },
      {
        speaker: null,
        text: "The voice fades. You reach the stairwell to the third floor."
      },
      {
        speaker: "Maria (Crying)",
        text: "Please... don't leave me here..."
      },
      {
        speaker: "You",
        text: "Another voice? Who are you?"
      },
      {
        speaker: "Maria",
        text: "I'm Maria. Subject 5. They... they took everything from me. My family, my memories... I can't even remember my daughter's face."
      },
      {
        speaker: "You",
        text: "I'm sorry. I'm so sorry this happened to you."
      },
      {
        speaker: "Maria",
        text: "The laboratory... that's where it happened. Where they broke us. Please... make sure no one else suffers like this."
      },
      {
        speaker: "You",
        text: "I will. I promise."
      },
      {
        speaker: null,
        text: "You find a keycard on the ground. It's labeled 'Dr. S. Chen - Level 3 Access'."
      },
      {
        speaker: "You",
        text: "Sarah's card... she must have left this for me."
      }
    ],
    
    choices: [
      {
        text: "Use Sarah's keycard to access the third floor",
        hint: "Direct access",
        sanityChange: 5,
        giveItem: {
          id: 'keycard',
          name: 'Access Keycard',
          icon: '💳',
          description: 'Dr. Chen\'s level 3 access card',
          consumable: true
        },
        nextScene: 'chapter_3_lab_truth'
      }
    ]
  },

  // ==================== CHAPTER 3: THE LABORATORY ====================
  chapter_3_lab_truth: {
    id: 'chapter_3_lab_truth',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "The door opens with a mechanical hiss. Inside is a vast laboratory, filled with abandoned equipment and scattered files."
      },
      {
        speaker: "You",
        text: "This is it. The place where it all happened."
      },
      {
        speaker: null,
        text: "In the center of the room is a large chair with restraints. Dried blood stains the armrests."
      },
      {
        speaker: "You",
        text: "That chair... I remember sitting in that chair. The pain... the fear..."
      },
      {
        speaker: "Dr. Williams",
        text: "Welcome home, Subject 7. Or should I say... Alex?"
      },
      {
        speaker: null,
        text: "Dr. Williams steps out from behind a computer terminal. He looks older than you remember, tired."
      },
      {
        speaker: "You",
        text: "You know my name. You knew it all along."
      },
      {
        speaker: "Dr. Williams",
        text: "Of course. I know everything about you. Your sister Emma, your mother, your desperate need for money."
      },
      {
        speaker: "You",
        text: "You used that against me. You exploited my desperation."
      },
      {
        speaker: "Dr. Williams",
        text: "I gave you an opportunity. Most people would kill for the chance to forget their pain."
      },
      {
        speaker: "You",
        text: "By destroying who I am?! That's not healing, that's murder!"
      },
      {
        speaker: "Dr. Williams",
        text: "Dramatic as always. You were always the most resilient subject. That's why you're special."
      },
      {
        speaker: null,
        text: "He walks to the computer and pulls up files. Video recordings of the experiments."
      },
      {
        speaker: "Dr. Williams",
        text: "Look. This is Subject 1 through 6. All failures. Their minds broke completely."
      },
      {
        speaker: "You",
        text: "You're a monster."
      },
      {
        speaker: "Dr. Williams",
        text: "I'm a scientist. And you, Alex, are my masterpiece. You retained your core self while being open to suggestion."
      },
      {
        speaker: "You",
        text: "What do you want from me?"
      },
      {
        speaker: "Dr. Williams",
        text: "I want you to understand. This research could help millions. PTSD, trauma, addiction... all could be cured."
      },
      {
        speaker: "Sarah (Entering)",
        text: "By destroying people's identities?! That's not a cure, Williams!"
      },
      {
        speaker: "Dr. Williams",
        text: "Ah, Dr. Chen. I wondered when you'd show up."
      },
      {
        speaker: "Sarah",
        text: "Alex, listen to me. There's a self-destruct system for the facility. We can end this, destroy all the research."
      },
      {
        speaker: "Dr. Williams",
        text: "Or you could take the research with you. Use it properly. Imagine the good you could do."
      },
      {
        speaker: "You",
        text: "I... I don't know..."
      },
      {
        speaker: "John (Whisper)",
        text: "Destroy it, Alex. Don't let anyone else suffer."
      },
      {
        speaker: "Maria (Whisper)",
        text: "Please... end this nightmare."
      },
      {
        speaker: "Sarah",
        text: "The choice is yours, Alex. But choose carefully. There's no going back."
      },
      {
        speaker: null,
        text: "You stand at the central console. Two buttons in front of you. One red. One blue."
      },
      {
        speaker: "Dr. Williams",
        text: "Red destroys everything. Blue preserves the data for transfer. What will it be?"
      }
    ],
    
    choices: [
      {
        text: "Press the RED button - Destroy all research",
        hint: "End the nightmare forever",
        sanityChange: 20,
        nextScene: 'ending_freedom',
        isEnding: true
      },
      {
        text: "Press the BLUE button - Preserve the research",
        hint: "The knowledge could help others",
        sanityChange: -10,
        nextScene: 'ending_burden',
        isEnding: true
      }
    ]
  },

  chapter_3_lab_fail: {
    id: 'chapter_3_lab_fail',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "The keypad beeps angrily. ACCESS DENIED flashes on the screen."
      },
      {
        speaker: "Security System",
        text: "INCORRECT CODE. LOCKDOWN INITIATED. ALERTING DR. WILLIAMS."
      },
      {
        speaker: "You",
        text: "No! No, no, no!"
      },
      {
        speaker: "Sarah",
        text: "Alex! We need to go, now!"
      },
      {
        speaker: "Dr. Williams (Intercom)",
        text: "Did you really think it would be that easy, Subject 7?"
      },
      {
        speaker: null,
        text: "Alarms blare throughout the facility. Red lights flash in the darkness."
      },
      {
        speaker: "Sarah",
        text: "This way! There's an emergency exit!"
      },
      {
        speaker: "You",
        text: "But the laboratory—"
      },
      {
        speaker: "Sarah",
        text: "Forget it! We need to survive first!"
      },
      {
        speaker: null,
        text: "You run through the corridors, the alarms drowning out everything else."
      }
    ],
    
    choices: [
      {
        text: "Escape with Sarah",
        hint: "Survive to fight another day",
        sanityChange: -15,
        nextScene: 'ending_burden',
        isEnding: true
      }
    ]
  },

  // ==================== ENDINGS ====================
  ending_freedom: {
    id: 'ending_freedom',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "You press the red button. Immediately, alarms begin to sound."
      },
      {
        speaker: "Computer",
        text: "SELF-DESTRUCT SEQUENCE INITIATED. FACILITY DESTRUCTION IN 5 MINUTES."
      },
      {
        speaker: "Dr. Williams",
        text: "No! You're destroying years of research! Decades of work!"
      },
      {
        speaker: "You",
        text: "This 'work' destroyed lives. It ends here, Williams."
      },
      {
        speaker: "Sarah",
        text: "Alex, we need to go! Now!"
      },
      {
        speaker: null,
        text: "Dr. Williams tries to stop you, but Sarah holds him back."
      },
      {
        speaker: "Sarah",
        text: "It's over, doctor. Let them go."
      },
      {
        speaker: "John",
        text: "Thank you, Alex. We can finally rest now."
      },
      {
        speaker: "Maria",
        text: "You did it. You saved us all."
      },
      {
        speaker: null,
        text: "You run through the corridors as the facility begins to collapse around you."
      },
      {
        speaker: "You",
        text: "Sarah! Come with me!"
      },
      {
        speaker: "Sarah",
        text: "I can't. I need to make sure Williams doesn't escape. Go! Live your life!"
      },
      {
        speaker: null,
        text: "You burst through the exit doors into the cool night air. Behind you, the facility explodes in a ball of flame."
      },
      {
        speaker: "You",
        text: "It's over. It's finally over."
      },
      {
        speaker: null,
        text: "Six months later, you're reunited with your sister Emma. The memories of the facility fade, but the scars remain."
      },
      {
        speaker: "Emma",
        text: "Welcome home, Alex."
      },
      {
        speaker: "You",
        text: "It's good to be home."
      }
    ],
    
    choices: [],
    endingMessage: "TRUE ENDING: FREEDOM - You destroyed the research and freed all the trapped souls. You returned to your family with your sanity intact."
  },

  ending_burden: {
    id: 'ending_burden',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "You press the blue button. The computer begins downloading the research data."
      },
      {
        speaker: "Computer",
        text: "DATA TRANSFER INITIATED. COPYING TO EXTERNAL DRIVE."
      },
      {
        speaker: "Dr. Williams",
        text: "A wise choice, Alex. This research is too valuable to destroy."
      },
      {
        speaker: "Sarah",
        text: "Alex... what have you done?"
      },
      {
        speaker: "You",
        text: "This knowledge... in the right hands, it could help people. Really help them."
      },
      {
        speaker: "Sarah",
        text: "That's what Williams said. That's what they all say."
      },
      {
        speaker: "You",
        text: "I won't make his mistakes. I'll use this to heal, not harm."
      },
      {
        speaker: null,
        text: "The download completes. You take the drive and head for the exit."
      },
      {
        speaker: "John",
        text: "Alex... are you sure about this?"
      },
      {
        speaker: "Maria",
        text: "Please... don't let anyone else suffer like we did."
      },
      {
        speaker: "You",
        text: "I won't. I promise."
      },
      {
        speaker: null,
        text: "You leave the facility, the weight of the research heavy in your pocket."
      },
      {
        speaker: "Dr. Williams (Distant)",
        text: "Remember, Alex... the road to hell is paved with good intentions."
      },
      {
        speaker: null,
        text: "One year later, you've established a clinic using modified versions of the research. But every night, you dream of the facility."
      },
      {
        speaker: "You",
        text: "Did I make the right choice? Or have I become what I fought against?"
      },
      {
        speaker: null,
        text: "The answer remains unclear. The burden of knowledge weighs heavily on your conscience."
      }
    ],
    
    choices: [],
    endingMessage: "AMBIGUOUS ENDING: THE BURDEN - You escaped with the research, hoping to use it for good. But the moral weight of this decision haunts you. Did you save lives, or perpetuate the cycle?"
  },

  ending_insane: {
    id: 'ending_insane',
    background: hospitalBg,
    
    dialogues: [
      {
        speaker: null,
        text: "Your mind finally breaks under the accumulated strain."
      },
      {
        speaker: "You",
        text: "Hahaha... HAHAHA... it's all so clear now! So perfectly clear!"
      },
      {
        speaker: "Dr. Williams",
        text: "Subject 7 has reached critical psychological breakdown. Another failure."
      },
      {
        speaker: "Sarah",
        text: "No... Alex... fight it!"
      },
      {
        speaker: "You",
        text: "Alex? Who's Alex? I'm Subject 7. I've always been Subject 7."
      },
      {
        speaker: null,
        text: "Your sanity is completely depleted. You are lost forever in the darkness of your own fractured mind."
      }
    ],
    
    choices: [],
    endingMessage: "GAME OVER: SHATTERED MIND - Your sanity reached zero. Your mind is broken beyond repair."
  }
};

// ==================== ITEM CATALOG ====================
export const ITEMS = {
  flashlight: {
    id: 'flashlight',
    name: 'Flashlight',
    icon: '🔦',
    description: 'An old but functional flashlight. Provides light in dark areas.',
    consumable: false
  },
  
  keycard: {
    id: 'keycard',
    name: 'Access Keycard',
    icon: '💳',
    description: 'Dr. Chen\'s level 3 access card',
    consumable: true
  }
};
// ============================================
// BIRTHDAY SURPRISE — MOM'S SPECIAL EDITION
// ============================================
// Personalize this file with your own messages, names, and memories.
// Clear placeholders like [MOM'S NAME] and [YOUR NAME] are provided below.

const CONFIG = {

    // ========================================
    // PERSONALIZATION & SETTINGS
    // ========================================

    // Name or title for your mother (e.g. "Mom", "Maa", "Amma", or "[MOM'S NAME]")
    recipient: "Mom",

    // Specific name for mom
    momName: "Jyoti Devi",

    // Your name as her child
    sender: "Abhishek Kumar",

    // Path to the background music file
    // Configured to your song file in the music folder (trimmed)
    musicPath: "music/birthday-special.mp3",

    // Optional PIN gate (disabled by default so Mom goes straight to her surprise)
    // Set to true if you want to require a secret code to open the site.
    enablePinGate: false,
    accessPin: "MOM",


    // ========================================
    // 1. WELCOME SCENE
    // ========================================

    welcome: {

        emoji: "🌸",

        tag: "A Special Gift For You",

        heading: "The Most Special Person in My Life ❤️",

        photo: "images/mom-main.jpg",

        photoAlt: "My beautiful mom on her birthday",

        title: "A Little Surprise for the Most Special Person in My Life ❤️",

        subtitle: "Happy Birthday, Mom ✨",

        continueText: "Open My Surprise 🌸"

    },


    // ========================================
    // 2. EMOTIONAL WELCOME MESSAGE SCENE
    // ========================================

    welcomeMessage: {

        emoji: "💖",

        title: "To My Dearest Mom",

        subtitle: "The heart and soul of our family",

        text: [
            "To the world, you may just be one person, but to me, you are my entire world. ❤️",
            "Every single day, you shower me with endless love, patience, and warmth without ever asking for anything in return.",
            "Today is your special day—a day to celebrate the incredible, selfless, and beautiful woman you are.",
            "I have prepared this little surprise straight from my heart. Click below when you are ready to begin! ✨"
        ],

        continueText: "Continue ✨"

    },


    // ========================================
    // 3. CUTE QUESTION SCENE
    // ========================================

    question: {

        emoji: "🥹❤️",

        title: "Are you ready to see",

        subtitle: "what I made for you, Mom? 🌸",

        yesText: "❤️ Yes, absolutely!",

        noText: "💜 Not yet",

        teaserMessages: [
            "अरे मम्मी, ये क्या! 😂",
            "नहीं चलेगा, मम्मी जी! 😜",
            "मुझे पकड़कर दिखाओ! 🏃‍♂️",
            "बस Yes दबा दो ना! 🥹❤️",
            "मम्मी, इतना भी क्या सोचना! 😂💕",
            "No का तो option ही नहीं है मम्मी! 🙈🌸"
        ]

    },


    // ========================================
    // 4. LIGHTS / NIGHT-SKY SCENE
    // ========================================

    lights: {

        moon: "🌙",

        buttonText: "Turn On the Lights",

        buttonEmoji: "💡",

        revealText: "Let's illuminate your special night ✨"

    },


    // ========================================
    // 5. CELEBRATION & DECORATION SPACE
    // ========================================

    celebration: {

        afterLightsText: "Much better... ❤️ But something is missing. Will you help me decorate, Mom?",

        decorateText: "🎀 Decorate"

    },

    decorations: {

        completeMessage: "It looks as beautiful as your heart, Mom! 🌸",

        nextMessage: "Now let's release the celebration balloons! 🎈",

        balloonButtonText: "🎈 Fly Balloons"

    },

    balloons: {

        count: 26,

        title: "🎉 HAPPY BIRTHDAY, MOM! 🎉",

        subtitle: "Wishing the sweetest, most wonderful mother a magical day full of joy! ❤️",

        cakeButtonText: "🎂 Let's celebrate"

    },


    // ========================================
    // 6. CAKE SCENE
    // ========================================

    cake: {

        title: "Make a wish and cut the cake, Mom! 🎂",

        buttonText: "🔪 Cut Cake",

        afterCutMessage: "May all your heartfelt wishes, prayers, and dreams come true! 🎂❤️",

        nextMessage: "Wait... there is one more special surprise waiting for you 🎁",

        giftButtonText: "🎁 One More Surprise"

    },


    // ========================================
    // 7. GIFT SCENE
    // ========================================

    gift: {

        intro: "A special package wrapped with infinite love, just for you... 💝",

        buttonText: "🎁 Open It",

        finalMessage: "There is something written straight from my heart that I want you to read... 💌",

        continueText: "Read My Letter 💌"

    },


    // ========================================
    // 8. HEARTFELT LETTER SCENE (TYPEWRITER)
    // ========================================

    letterContinueText: "चलो, यादों की गलियों में चलते हैं 🌸 →",

    letter: [

        {
            type: "heading",
            text: "मेरी प्यारी मम्मी, ज्योति देवी जी ❤️🌸"
        },

        {
            type: "paragraph",
            text: "जन्मदिन की ढेर सारी बधाइयाँ, मम्मी! 🎂❤️"
        },

        {
            type: "paragraph",
            text: "आप दुनिया की सबसे प्यारी, सबसे caring और सबसे शानदार मम्मी हो! 🥰"
        },

        {
            type: "paragraph",
            text: "मैं भले ही हर दिन आपको बोलकर न बताऊँ, लेकिन आपकी हर छोटी-बड़ी चीज़ की मुझे कद्र है। मेरे लिए आपका प्यार, आपकी चिंता, आपके हाथ का खाना और आपकी प्यारी-सी डाँट — सब बहुत खास हैं। 😄❤️"
        },

        {
            type: "paragraph",
            text: "वैसे मम्मी, आपकी एक बात तो माननी पड़ेगी… आप बिना कुछ कहे भी समझ जाती हो कि आपके बेटे के दिमाग में क्या चल रहा है! 😂 आपके सामने तो मेरी सारी चालाकियाँ फेल हो जाती हैं। लगता है मम्मियों के पास कोई अलग ही जासूसी शक्ति होती है! 🕵️‍♀️🤣"
        },

        {
            type: "paragraph",
            text: "जब भी मैं परेशान होता हूँ, आपका साथ मुझे हिम्मत देता है। आप मेरी छोटी-सी सफलता पर भी खुश हो जाती हो और मुश्किल समय में हमेशा मेरे साथ खड़ी रहती हो। मेरे लिए आप सिर्फ मम्मी नहीं, मेरी सबसे बड़ी ताकत और मेरी दुनिया हो। ❤️"
        },

        {
            type: "paragraph",
            text: "आपकी डाँट भी अनमोल है, आपका प्यार भी अनमोल है। बस मम्मी, जन्मदिन के दिन डाँट की छुट्टी मिल जाए तो मज़ा ही आ जाए! 😂🎁 लेकिन सच कहूँ, आपकी डाँट में भी मेरा भला ही छिपा होता है।"
        },

        {
            type: "paragraph",
            text: "आज आपके जन्मदिन पर भगवान से यही प्रार्थना है कि आपको हमेशा अच्छी सेहत, ढेर सारी खुशियाँ, मन की शांति और लंबी उम्र मिले। आपकी जिंदगी हमेशा मुस्कुराहटों और प्यार से भरी रहे। 🙏🌷"
        },

        {
            type: "paragraph",
            text: "आप हमेशा ऐसे ही हँसती-मुस्कुराती रहो। आपकी हर इच्छा पूरी हो और आपके चेहरे की मुस्कान कभी कम न हो। आप दुनिया की सारी खुशियों की हकदार हो, मम्मी! 💖"
        },

        {
            type: "final",
            text: "जन्मदिन मुबारक हो, मेरी प्यारी मम्मी ज्योति देवी! 🎂🌸✨"
        },

        {
            type: "signature",
            text: "आपसे बहुत सारा प्यार, ढेर सारा सम्मान और अनगिनत झप्पियाँ! 🤗❤️\n\nआपका प्यारा बेटा,\nअभिषेक कुमार ❤️"
        }

    ],


    // ========================================
    // PHOTO MEMORIES GALLERY
    // ========================================

    gallery: {

        tag: "🌸 A Walk Down Memory Lane",

        title: "Cherished Memories With You ❤️",

        subtitle: "Every picture holds a thousand moments of warmth and love.",

        photos: [
            {
                src: "images/mom-memory-1.jpg",
                alt: "Mom holding baby dressed as Little Krishna",
                caption: "Precious memories with you ❤️"
            },
            {
                src: "images/mom-memory-2.jpg",
                alt: "Childhood memory of Mom holding child's hand by the garden gate",
                caption: "You have held my hand through every step of life."
            },
            {
                src: "images/mom-memory-3.jpg",
                alt: "Childhood family photo with Mom, Dad, and children",
                caption: "The heart and soul of our family. 🌸"
            },
            {
                src: "images/mom-memory-4.jpg",
                alt: "Vintage portrait of Mom in young age",
                caption: "Always as graceful, gentle, and beautiful as ever. ✨"
            },
            {
                src: "images/mom-memory-5.jpg",
                alt: "Outdoor selfie with Mom smiling",
                caption: "Every moment with you is special."
            },
            {
                src: "images/mom-memory-6.jpg",
                alt: "Outdoor scenic photo of Mom with her children in front of hills",
                caption: "Together with you is our favorite place to be. 💖"
            },
            {
                src: "images/mom-memory-7.jpg",
                alt: "Birthday celebration photo with Mom",
                caption: "Celebrating your warmth, your smile, and your endless love. 🎂"
            },
            {
                src: "images/mom-memory-8.jpg",
                alt: "Playful candid photo of Mom and daughter",
                caption: "Your smile brings endless sunshine into our home. 🌷"
            },
            {
                src: "images/mom-memory-9.jpg",
                alt: "Family selfie at home with Mom",
                caption: "Thank you for always being there for all of us."
            },
            {
                src: "images/mom-memory-10.jpg",
                alt: "Candid resting moment with Mom",
                caption: "Forever grateful for your warmth, hugs, and care. ❤️"
            }
        ],

        continueText: "Continue to Final Surprise ✨"

    },


    // ========================================
    // 9. FINAL BIRTHDAY PHOTO SCENE
    // ========================================

    final: {

        photo: "images/mom-final.jpg",

        photoAlt: "My beautiful mom on her birthday",

        heading: "Happy Birthday, Mom ❤️",

        messages: [
            "Thank you for your love, care, and everything you do for me.",
            "I love you more than words can say."
        ],

        signature: "With all my love,\nAbhishek Kumar ❤️",

        replayText: "↻ Replay the Surprise"

    },


    // ========================================
    // THEME PALETTE
    // ========================================

    theme: {

        primary: "#ff8fab",

        secondary: "#cdb4db",

        accent: "#ffd166",

        background: "#fff8f0"

    }

};
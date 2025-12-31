/* =====================
   DOM REFERENCES
===================== */
const passwordScreen = document.getElementById("passwordScreen");
const galleryContent = document.getElementById("galleryContent");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const lilyHotspots = document.getElementById("lilyHotspots");

const memoryCard = document.getElementById("memoryCard");
const closeMemoryCard = document.getElementById("closeMemoryCard");
const memoryImage = document.getElementById("memoryImage");
const memoryDate = document.getElementById("memoryDate");
const memoryDescription = document.getElementById("memoryDescription");

/* =====================
   PASSWORD
===================== */
const CORRECT_PASSWORD = "29082025";

passwordInput.addEventListener("input", () => {
  passwordInput.value = passwordInput.value.replace(/[^0-9]/g, "");
  passwordError.classList.remove("show");
  passwordInput.classList.remove("shake");
});

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") validatePassword();
});

function validatePassword() {
  if (passwordInput.value === CORRECT_PASSWORD) {
    passwordScreen.classList.add("fade-out");

    setTimeout(() => {
      galleryContent.classList.remove("hidden");
      galleryContent.classList.add("fade-in");
      initHotspots();
    }, 500);
  } else {
    passwordError.classList.add("show");
    passwordInput.classList.add("shake");
  }
}

/* =====================
   LILY HOTSPOTS
   (CIRCULAR, NON-OVERLAPPING)
===================== */

const lilies = [
  {
    id: 1,
    x: 48,
    y: 48,
    folder: "hotspot1", // Folder name in /media/images/
    date: "29th Aug 2025",
    description: "This day is obviously special because this is the day when we first met after we started talking-talking. I still remember bohot jorse baarish hui thi but we still managed and spent the evening. I got you modaks, you wore a slevless shirt that day, and that was the day i discovered ki mujhe jaadu aata hai"
  },
  {
    id: 2,
    x: 18,
    y: 52,
    folder: "hotspot2", // Folder name in /media/images/
    date: "5th Sept 2025",
    description: "This date will forever be close to my heart, the simple reason is ki this was our very first date. Mene iske pehle aajtk horror movie theater mai nahi dekhi thi isliye halki si fatti hui thi but movie went well, i remember ham fir marine drive gaye the wherein for the first time in my life mene mumbai ki coastline nahi dekhi, cuz my eyes were busy looking at something faaar mooore beautiful. Also if u remeber then this was the day jb ham cats jaise nose rub karna seekhe"
  },
  {
    id: 3,
    x: 58,
    y: 64, // Brought it lower (from 54 to 64)
    folder: "hotspot3", // Folder name in /media/images/
    date: "27th Sept",
    description: "A very very very special day. This was the day when it finally hit me ki shit i just got married to the IT-GIRL. The way u dance ooooh hoooo ohhhh uffff, ye woh din tha jb mene jaana ki beta ansh abh naacha seekhna hoga varna madam ke steps match nhi kar payega zindagi bhai. Also ye wahi din tha jb mene pehli baar tere liye kuch khareeda, ik kuch zyda khaas nahi le paya but koshish kari thi. issi din hamne adventure karke pehli baar poori raat saath mai bitai thi, this was the night when i gave you those 18mins (wink-wink). Shady hotel room ko bhi tune swarg jaise bana diya tha apne lap mai sulakr, cuddle karke !!!!!"
  },
  {
    id: 4,
    x: 76, // Moved to the right a lot (from 26 to 76, about 50% more)
    y: 42, // Moved down very little (from 40 to 42)
    folder: "hotspot4", // Folder name in /media/images/
    date: "17th Oct 2025",
    description: "This was my favouraite day, because this was the day when we almost lived like a married couple. Ache se yaad hai mujhe kaafi plan kiya tha hamne ki pehle lunch krlenge social mai, fir shawping karenge aur fir sleepover and then tujhe drop krdunga ghar ke liye but fir hamara ek mini jhagda hua. Lunch plans flopped but we pushed throught taxi mai bhi lade ham, but aakhir mai pyaar itna hai ki sb chod chadkr taxi mai hi tune mujhe apne chest pr sula liya aur hamne sb sort krliya. Then we went shopping, i got u a heart shaped necklace, tune mere liye tshirts li(ur fav im wearing rn) dinner tha Mc'D pr jaha hamari server ko bhi pata laga ki kaise mujhe darra dhamka kar rakha jata hai. Raat mai mai mere frnds se mila(i miss them a lot btw). and agli subha tune mujhe apne pyaare pyaare haathon se nahalaya aur haan mai girly pop bhi banna tha. Will never ever forget that(btw woh hair mask konsa hai?) also thanks rucha "
  },
  {
    id: 5,
    x: 69, // Moved rightwards about 15% (from 54 to 69)
    y: 55, // Moved down the same amount (from 40 to 55, adding 15)
    folder: "hotspot5", // Folder name in /media/images/
    date: "3rd Nov 2025",
    description: "They say that men only recieve flowers after they die, on their grave. Waise by this point mai mar toh chuka hi tha, cuz it had been 4 days since i saw you, but this day was very very very special. Cause ye woh din tha jb meri modku ne apna ego side mai rakha aur mere liye woh flowers lekr aai, bohot sambhal kr rakha hua hai mene tera sunflower (paper mai note likha tha if u remember). This was the day when ekdum ekdum ekdum 1000000% clear hogaya tha ki abh mai agar shaadi krunga toh tujhse varna aise hi mar jaunga cuz what u did was soo soo special. Thnak you sooo sooo much, LOVE YOU!!!!!"
  }
];

function initHotspots() {
  lilyHotspots.innerHTML = "";

  lilies.forEach((lily) => {
    const el = document.createElement("div");
    el.className = "lily-hotspot";

    /* position using percentage coordinates */
    el.style.left = `${lily.x}%`;
    el.style.top = `${lily.y}%`;

    el.addEventListener("click", (e) => {
      e.stopPropagation();
      openMemory(lily);
    });

    lilyHotspots.appendChild(el);
  });
}

/* =====================
   MEMORY CARD
===================== */

// Track current image index and image lists for each hotspot
const currentImageIndex = {};
const hotspotImageLists = {};

// Function to get images from a folder (simplified approach for static files)
function getImagesForHotspot(folderName) {
  // Define common image extensions
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
  const images = [];

  // Try up to 20 images per folder (you can adjust this number)
  for (let i = 1; i <= 20; i++) {
    for (const ext of extensions) {
      // We'll check if the image exists by trying to load it
      const imgPath = `media/images/${folderName}/img${i}.${ext}`;

      // Create a temporary image to check if it exists
      const img = new Image();
      img.onload = function() {
        // If image loads successfully, add it to the list
        if (!images.includes(imgPath)) {
          images.push(imgPath);
        }
      };
      img.src = imgPath;
    }
  }

  // For now, return a predefined list based on common patterns
  // In a real implementation, you'd need server-side logic to list directory contents
  const predefinedImages = [];
  for (let i = 1; i <= 10; i++) { // Check up to 10 images
    predefinedImages.push(`media/images/${folderName}/img${i}.jpg`);
    predefinedImages.push(`media/images/${folderName}/img${i}.png`);
    predefinedImages.push(`media/images/${folderName}/img${i}.jpeg`);
  }

  return predefinedImages;
}

function openMemory(lily) {
  currentLilyId = lily.id;

  // Load images for this hotspot if not already loaded
  if (!hotspotImageLists[lily.id]) {
    // Predefine the image list for this hotspot based on its folder
    hotspotImageLists[lily.id] = [
      `media/images/${lily.folder}/img1.jpg`,
      `media/images/${lily.folder}/img2.jpg`,
      `media/images/${lily.folder}/img3.jpg`,
      `media/images/${lily.folder}/img4.jpg`,
      `media/images/${lily.folder}/img5.jpg`,
      `media/images/${lily.folder}/img6.jpg`,
      `media/images/${lily.folder}/img7.jpg`,
      `media/images/${lily.folder}/img8.jpg`,
      `media/images/${lily.folder}/img9.jpg`,
      `media/images/${lily.folder}/img10.jpg`
    ];

    // Initialize current image index for this lily if not already set
    currentImageIndex[lily.id] = 0;
  }

  // Set the current image
  if (hotspotImageLists[lily.id].length > 0 && hotspotImageLists[lily.id][currentImageIndex[lily.id]]) {
    memoryImage.src = hotspotImageLists[lily.id][currentImageIndex[lily.id]];
  } else {
    // Fallback if no images exist in the folder
    memoryImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'; // 1x1 transparent gif
  }

  memoryDate.textContent = lily.date;
  memoryDescription.textContent = lily.description;
  memoryDescription.contentEditable = false; // Make description non-editable

  // Show the memory card with animation
  memoryCard.classList.remove("hidden");
  // Trigger reflow to ensure the hidden class is applied before adding active
  void memoryCard.offsetWidth;
  memoryCard.classList.add("active");

  // Darken background with subtle overlay
  document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
}

function closeMemory() {
  memoryCard.classList.remove("active");

  // Wait for animation to complete before hiding
  setTimeout(() => {
    memoryCard.classList.add("hidden");
    // Restore original background
    document.body.style.backgroundColor = '';
  }, 400);
}

// Add click functionality to cycle through images
memoryImage.addEventListener("click", (e) => {
  e.stopPropagation();
  // Find the current lily being displayed
  const currentLily = lilies.find(l => l.id === currentLilyId);
  if (currentLily && hotspotImageLists[currentLily.id] && hotspotImageLists[currentLily.id].length > 1) {
    currentImageIndex[currentLily.id] = (currentImageIndex[currentLily.id] + 1) % hotspotImageLists[currentLily.id].length;
    memoryImage.src = hotspotImageLists[currentLily.id][currentImageIndex[currentLily.id]];
  }
});

// Track the currently displayed lily
let currentLilyId = null;

closeMemoryCard.addEventListener("click", closeMemory);
memoryCard.addEventListener("click", (e) => {
  if (e.target === memoryCard) closeMemory();
});

/*
 * DETAILED INSTRUCTIONS FOR ADDING YOUR CONTENT:
 *
 * 1. ADDING IMAGES FOR EACH HOTSPOT:
 *    - Create folders in /media/images/ named as: hotspot1, hotspot2, hotspot3, etc.
 *    - Place your images in the corresponding folder
 *    - Name your images sequentially as: img1.jpg, img2.jpg, img3.jpg, etc.
 *    - Examples:
 *      - For hotspot 1: create folder /media/images/hotspot1/ and add img1.jpg, img2.jpg, etc.
 *      - For hotspot 2: create folder /media/images/hotspot2/ and add img1.jpg, img2.jpg, etc.
 *    - You can have any number of images per hotspot (0 to unlimited)
 *    - Supported formats: jpg, jpeg, png, gif, webp
 *    - Recommended size: Square images (e.g., 800x800px) for best display in the memory card
 *
 * 2. ADDING CUSTOM MESSAGES AND DATES FOR EACH HOTSPOT:
 *    - Edit the lilies array in this file (lines 51-88)
 *    - Each hotspot has these properties:
 *      - id: The hotspot number (1-5)
 *      - x: Horizontal position as percentage (0-100)
 *      - y: Vertical position as percentage (0-100)
 *      - folder: The folder name in /media/images/ that contains the images
 *      - date: The date text to display in the memory card
 *      - description: The description text to display in the memory card
 *
 *    Example for hotspot 1:
 *    {
 *      id: 1,
 *      x: 48,      // Horizontal position (48% from left)
 *      y: 48,      // Vertical position (48% from top)
 *      folder: "hotspot1",  // Folder name in /media/images/
 *      date: "Our First Date",              // Date text to show
 *      description: "We went to the park and had a wonderful time together."  // Description text to show
 *    },
 *
 * 3. STEP-BY-STEP PROCESS:
 *    a) Create a folder in /media/images/ with the name "hotspot[id]" (e.g., "hotspot1")
 *    b) Add your images to that folder named img1.jpg, img2.jpg, etc.
 *    c) Open this script.js file
 *    d) Find the lilies array (around lines 51-88)
 *    e) For each hotspot, update:
 *       - The folder field with your folder name
 *       - The date field with your custom date
 *       - The description field with your custom message
 *    f) Save the file
 *
 * 4. HOW TO CYCLE THROUGH MULTIPLE IMAGES:
 *    - When a memory card opens, it shows the first image from the folder
 *    - Click on the image to cycle to the next image in the sequence
 *    - It will loop back to the first image after the last one
 *
 * 5. OTHER SETTINGS:
 *    - Password: Change the CORRECT_PASSWORD constant (line 31) to your desired access code
 *    - Hotspot positions: Adjust x and y values in the lilies array to reposition hotspots
 *    - The description text is NOT editable by users - only in the code
 *
 * 6. TROUBLESHOOTING:
 *    - If images don't show: Check that folders are named correctly and images are named img1.jpg, img2.jpg, etc.
 *    - If hotspots don't work: Check that x,y values are between 0-100
 *    - If memory card doesn't open: Check that all required fields are filled
 */

window.addEventListener("orientationchange", () => {
  setTimeout(initHotspots, 300);
});

const params = new URLSearchParams(window.location.search);
const surahNumber = Number(params.get("surah"));

const surahs = [
  ["Al-Fatihah", "الفاتحة"],
  ["Al-Baqarah", "البقرة"],
  ["Aal-Imran", "آل عمران"],
  ["An-Nisa", "النساء"],
  ["Al-Ma'idah", "المائدة"],
  ["Al-An'am", "الأنعام"],
  ["Al-A'raf", "الأعراف"],
  ["Al-Anfal", "الأنفال"],
  ["At-Tawbah", "التوبة"],
  ["Yunus", "يونس"],
  ["Hud", "هود"],
  ["Yusuf", "يوسف"],
  ["Ar-Ra'd", "الرعد"],
  ["Ibrahim", "إبراهيم"],
  ["Al-Hijr", "الحجر"],
  ["An-Nahl", "النحل"],
  ["Al-Isra", "الإسراء"],
  ["Al-Kahf", "الكهف"],
  ["Maryam", "مريم"],
  ["Ta-Ha", "طه"],
  ["Al-Anbiya", "الأنبياء"],
  ["Al-Hajj", "الحج"],
  ["Al-Mu'minun", "المؤمنون"],
  ["An-Nur", "النور"],
  ["Al-Furqan", "الفرقان"],
  ["Ash-Shu'ara", "الشعراء"],
  ["An-Naml", "النمل"],
  ["Al-Qasas", "القصص"],
  ["Al-Ankabut", "العنكبوت"],
  ["Ar-Rum", "الروم"],
  ["Luqman", "لقمان"],
  ["As-Sajdah", "السجدة"],
  ["Al-Ahzab", "الأحزاب"],
  ["Saba", "سبأ"],
  ["Fatir", "فاطر"],
  ["Ya-Sin", "يس"],
  ["As-Saffat", "الصافات"],
  ["Sad", "ص"],
  ["Az-Zumar", "الزمر"],
  ["Ghafir", "غافر"],
  ["Fussilat", "فصلت"],
  ["Ash-Shura", "الشورى"],
  ["Az-Zukhruf", "الزخرف"],
  ["Ad-Dukhan", "الدخان"],
  ["Al-Jathiyah", "الجاثية"],
  ["Al-Ahqaf", "الأحقاف"],
  ["Muhammad", "محمد"],
  ["Al-Fath", "الفتح"],
  ["Al-Hujurat", "الحجرات"],
  ["Qaf", "ق"],
  ["Adh-Dhariyat", "الذاريات"],
  ["At-Tur", "الطور"],
  ["An-Najm", "النجم"],
  ["Al-Qamar", "القمر"],
  ["Ar-Rahman", "الرحمن"],
  ["Al-Waqi'ah", "الواقعة"],
  ["Al-Hadid", "الحديد"],
  ["Al-Mujadilah", "المجادلة"],
  ["Al-Hashr", "الحشر"],
  ["Al-Mumtahanah", "الممتحنة"],
  ["As-Saff", "الصف"],
  ["Al-Jumu'ah", "الجمعة"],
  ["Al-Munafiqun", "المنافقون"],
  ["At-Taghabun", "التغابun"],
  ["At-Talaq", "الطلاق"],
  ["At-Tahrim", "التحريم"],
  ["Al-Mulk", "الملك"],
  ["Al-Qalam", "القلم"],
  ["Al-Haqqah", "الحاقة"],
  ["Al-Ma'arij", "المعارج"],
  ["Nuh", "نوح"],
  ["Al-Jinn", "الجن"],
  ["Al-Muzzammil", "المزمل"],
  ["Al-Muddaththir", "المدثر"],
  ["Al-Qiyamah", "القيامة"],
  ["Al-Insan", "الإنسان"],
  ["Al-Mursalat", "المرسلات"],
  ["An-Naba", "النبأ"],
  ["An-Nazi'at", "النازعات"],
  ["Abasa", "عبس"],
  ["At-Takwir", "التكوير"],
  ["Al-Infitar", "الانفطار"],
  ["Al-Mutaffifin", "المطففين"],
  ["Al-Inshiqaq", "الانشقاق"],
  ["Al-Buruj", "البروج"],
  ["At-Tariq", "الطارق"],
  ["Al-A'la", "الأعلى"],
  ["Al-Ghashiyah", "الغاشية"],
  ["Al-Fajr", "الفجر"],
  ["Al-Balad", "البلد"],
  ["Ash-Shams", "الشمس"],
  ["Al-Layl", "الليل"],
  ["Ad-Duha", "الضحى"],
  ["Ash-Sharh", "الشرح"],
  ["At-Tin", "التين"],
  ["Al-Alaq", "العلق"],
  ["Al-Qadr", "القدر"],
  ["Al-Bayyinah", "البينة"],
  ["Az-Zalzalah", "الزلزلة"],
  ["Al-Adiyat", "العاديات"],
  ["Al-Qari'ah", "القارعة"],
  ["At-Takathur", "التكاثر"],
  ["Al-Asr", "العصر"],
  ["Al-Humazah", "الهمزة"],
  ["Al-Fil", "الفيل"],
  ["Quraysh", "قريش"],
  ["Al-Ma'un", "الماعون"],
  ["Al-Kawthar", "الكوثر"],
  ["Al-Kafirun", "الكافرون"],
  ["An-Nasr", "النصر"],
  ["Al-Masad", "المسد"],
  ["Al-Ikhlas", "الإخلاص"],
  ["Al-Falaq", "الفلق"],
  ["An-Nas", "الناس"]
];

async function loadSurah() {

  const nameElement = document.getElementById("surahName");
  const arabicElement = document.getElementById("surahArabic");
  const infoElement = document.getElementById("surahInfo");
  const ayahsElement = document.getElementById("ayahs");

  if (!surahNumber || surahNumber < 1 || surahNumber > 114) {

    nameElement.textContent = "Invalid Surah";
    infoElement.textContent = "";
    ayahsElement.innerHTML = "";

    return;
  }

  const surah = surahs[surahNumber - 1];

  nameElement.textContent = surah[0];
  arabicElement.textContent = surah[1];
  infoElement.textContent = "Loading verses...";

  try {

    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`
    );

    if (!response.ok) {
      throw new Error("Unable to connect to Quran API");
    }

    const data = await response.json();

    const ayahs = data.data.ayahs;

    infoElement.textContent =
      `Surah ${surahNumber} • ${ayahs.length} Ayahs`;

    ayahsElement.innerHTML = "";

    ayahs.forEach(ayah => {

      const div = document.createElement("div");

      div.className = "ayah";

      div.innerHTML = `
        <div class="ayah-top">

          <div class="ayah-number">
            ${ayah.numberInSurah}
          </div>

          <div class="ayah-buttons">

            <button
              class="ayah-button"
              onclick="copyAyah(this)"
            >
              📋
            </button>

            <button
              class="ayah-button"
              onclick="bookmarkAyah(this)"
            >
              ☆
            </button>

          </div>

        </div>

        <div class="arabic-text">
          ${ayah.text}
          ﴿${ayah.numberInSurah}﴾
        </div>
      `;

      ayahsElement.appendChild(div);

    });

  } catch (error) {

    console.error(error);

    infoElement.textContent = "Unable to load Surah";

    ayahsElement.innerHTML = `
      <div class="error">
        <h2>Unable to load the Surah</h2>
        <p>
          Please check your internet connection and try again.
        </p>
      </div>
    `;

  }
}


// Copy Ayah
function copyAyah(button) {

  const text =
    button
      .closest(".ayah")
      .querySelector(".arabic-text")
      .innerText;

  navigator.clipboard.writeText(text);

  button.textContent = "✓";

  setTimeout(() => {
    button.textContent = "📋";
  }, 1500);
}


// Bookmark Ayah
function bookmarkAyah(button) {

  button.textContent =
    button.textContent === "★" ? "☆" : "★";

}


// Start
loadSurah();

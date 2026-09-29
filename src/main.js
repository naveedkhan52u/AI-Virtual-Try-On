import "./style.css";

const products = [
  { id: 1, name: "Classic Black Blazer", category: "Jackets", price: "$89", tone: "#171717", accent: "#6b7280", icon: "blazer", apiCategory: "tops" },
  { id: 2, name: "Relaxed White Shirt", category: "Shirts", price: "$49", tone: "#f7f7f2", accent: "#c9c7bf", icon: "shirt", apiCategory: "tops" },
  { id: 3, name: "Minimal Beige Jacket", category: "Jackets", price: "$79", tone: "#c8a982", accent: "#8c7254", icon: "jacket", apiCategory: "tops" },
  { id: 4, name: "Everyday Denim Jacket", category: "Denim", price: "$69", tone: "#4b6380", accent: "#263c56", icon: "denim", apiCategory: "tops" }
];

let selectedProduct = products[0];
let uploadedImage = null;

const garmentSvg = (product) => {
  const c = product.tone;
  const a = product.accent;
  if (product.icon === "shirt") return `
    <svg viewBox="0 0 360 420" aria-label="shirt preview">
      <path d="M95 72 L148 35 L180 72 L212 35 L265 72 L325 130 L282 184 L260 160 L260 390 L100 390 L100 160 L78 184 L35 130 Z" fill="${c}" stroke="${a}" stroke-width="7"/>
      <path d="M148 35 Q180 95 212 35" fill="none" stroke="${a}" stroke-width="7"/>
      <path d="M180 72 V390" stroke="${a}" stroke-width="5"/>
    </svg>`;
  if (product.icon === "blazer") return `
    <svg viewBox="0 0 360 420" aria-label="blazer preview">
      <path d="M110 70 L155 35 L180 90 L205 35 L250 70 L320 145 L274 205 L252 180 L260 390 L100 390 L108 180 L86 205 L40 145 Z" fill="${c}" stroke="${a}" stroke-width="7"/>
      <path d="M155 35 L180 90 L205 35 L180 145 Z" fill="#2d2d2d"/>
      <path d="M180 145 L180 390 M145 180 L180 145 L215 180" fill="none" stroke="${a}" stroke-width="5"/>
      <circle cx="180" cy="210" r="5" fill="${a}"/><circle cx="180" cy="245" r="5" fill="${a}"/>
    </svg>`;
  return `
    <svg viewBox="0 0 360 420" aria-label="jacket preview">
      <path d="M105 68 L153 34 L180 82 L207 34 L255 68 L325 145 L278 198 L254 171 L265 390 L95 390 L106 171 L82 198 L35 145 Z" fill="${c}" stroke="${a}" stroke-width="7"/>
      <path d="M153 34 L180 82 L207 34 L180 145 Z" fill="${a}" opacity=".65"/>
      <path d="M180 145 V390" stroke="${a}" stroke-width="6"/>
      <path d="M125 230 H235" stroke="${a}" stroke-width="5"/>
    </svg>`;
};

document.querySelector("#app").innerHTML = `
  <main>
    <nav class="nav">
      <div class="brand"><span class="brand-mark">T</span> TryOn<span class="brand-ai">AI</span></div>
      <div class="nav-note">Virtual fashion preview</div>
    </nav>

    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">SHOP WITH CONFIDENCE</p>
        <h1>See it on <em>you</em><br/>before you buy.</h1>
        <p class="hero-text">Choose a fashion item, upload your photo, and create a virtual try-on preview in seconds.</p>
        <a class="hero-cta" href="#products">Explore products <span>↓</span></a>
      </div>
      <div class="hero-art">
        <div class="floating-card card-top">AI TRY-ON <strong>01</strong></div>
        <div class="model-shape"><div class="model-head"></div><div class="model-body"></div></div>
        <div class="floating-card card-bottom"><span class="dot"></span> Fit preview</div>
      </div>
    </section>

    <section class="shop" id="products">
      <div class="section-head">
        <div><p class="eyebrow">THE EDIT</p><h2>Choose your look</h2></div>
        <p>Pick a product to start your virtual try-on.</p>
      </div>
      <div class="product-grid">
        ${products.map(p => `
          <article class="product-card ${p.id === selectedProduct.id ? "selected" : ""}" data-id="${p.id}">
            <div class="product-visual" style="--tone:${p.tone};--accent:${p.accent}">
              <div class="product-art">${garmentSvg(p)}</div>
              <span class="category">${p.category}</span>
              <button class="select-btn">${p.id === selectedProduct.id ? "Selected" : "Try this"}</button>
            </div>
            <div class="product-info"><div><h3>${p.name}</h3><p>${p.category}</p></div><strong>${p.price}</strong></div>
          </article>`).join("")}
      </div>
    </section>

    <section class="try-section">
      <div class="try-copy">
        <p class="eyebrow">VIRTUAL TRY-ON</p>
        <h2>Now put your choice on you.</h2>
        <p>Upload a clear, full-body or upper-body photo. Your selected product will be used for the preview.</p>
        <div class="steps"><span>01</span><b>Upload photo</b><span>02</span><b>Select product</b><span>03</span><b>Generate</b></div>
      </div>
      <div class="try-panel">
        <input id="photoInput" type="file" accept="image/*" hidden />
        <label for="photoInput" class="upload-box" id="uploadBox">
          <div class="upload-icon">↑</div>
          <strong id="uploadTitle">Upload your photo</strong>
          <span id="uploadHint">PNG, JPG or WEBP</span>
        </label>
        <div class="selected-line"><span>Selected</span><strong id="selectedName">${selectedProduct.name}</strong></div>
        <button class="try-btn" id="tryBtn" disabled>Virtual Try On <span>→</span></button>
        <p class="demo-note">Powered by a third-party virtual try-on AI. Your API key stays on the server.</p>
      </div>
    </section>

    <section class="result-section hidden" id="resultSection">
      <div class="result-head"><div><p class="eyebrow">YOUR PREVIEW</p><h2>Virtual try-on result</h2></div><button id="resetBtn">Try another photo</button></div>
      <div class="result-card">
        <div class="result-image" id="resultImage"><div class="result-loading hidden" id="resultLoading"><span class="spinner"></span><strong>Creating your virtual try-on...</strong><small>This usually takes a few seconds.</small></div><img id="userPreview" alt="AI virtual try-on result"/><span class="ai-badge">AI TRY-ON</span></div>
        <div class="result-details"><p class="eyebrow">SELECTED ITEM</p><h3 id="resultName"></h3><p id="resultCategory"></p><strong id="resultPrice"></strong><button class="buy-btn">View product <span>→</span></button></div>
      </div>
    </section>

    <footer><span>TryOnAI</span><span>Fashion shopping, with fewer regrets.</span></footer>
  </main>
`;

function refreshCards() {
  document.querySelectorAll(".product-card").forEach(card => {
    const p = products.find(x => x.id === Number(card.dataset.id));
    card.classList.toggle("selected", p.id === selectedProduct.id);
    card.querySelector(".select-btn").textContent = p.id === selectedProduct.id ? "Selected" : "Try this";
  });
  document.querySelector("#selectedName").textContent = selectedProduct.name;
  document.querySelector("#tryBtn").disabled = !uploadedImage;
}

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    selectedProduct = products.find(p => p.id === Number(card.dataset.id));
    refreshCards();
  });
});

document.querySelector("#photoInput").addEventListener("change", e => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    uploadedImage = reader.result;
    document.querySelector("#uploadTitle").textContent = file.name;
    document.querySelector("#uploadHint").textContent = "Photo ready";
    document.querySelector("#uploadBox").classList.add("ready");
    refreshCards();
  };
  reader.readAsDataURL(file);
});

document.querySelector("#tryBtn").addEventListener("click", async () => {
  if (!uploadedImage) return;

  const tryBtn = document.querySelector("#tryBtn");
  const resultSection = document.querySelector("#resultSection");
  const resultLoading = document.querySelector("#resultLoading");
  const userPreview = document.querySelector("#userPreview");

  tryBtn.disabled = true;
  tryBtn.innerHTML = "Generating... <span>⏳</span>";
  resultSection.classList.remove("hidden");
  resultLoading.classList.remove("hidden");
  userPreview.classList.add("hidden");
  document.querySelector("#resultName").textContent = selectedProduct.name;
  document.querySelector("#resultCategory").textContent = selectedProduct.category;
  document.querySelector("#resultPrice").textContent = selectedProduct.price;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });

  try {
    const garmentImage = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(garmentSvg(selectedProduct));

    const startResponse = await fetch("/api/virtual-try-on", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelImage: uploadedImage,
        garmentImage,
        category: selectedProduct.apiCategory || "auto"
      })
    });

    const startData = await startResponse.json();

    if (!startResponse.ok || !startData.id) {
      throw new Error(startData.error || "Unable to start the virtual try-on.");
    }

    let result = null;

    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const statusResponse = await fetch("/api/virtual-try-on?id=" + encodeURIComponent(startData.id));
      const statusData = await statusResponse.json();

      if (!statusResponse.ok) {
        throw new Error(statusData.error || "Unable to check the try-on status.");
      }

      if (statusData.status === "completed" && statusData.image) {
        result = statusData.image;
        break;
      }

      if (["failed", "canceled", "cancelled"].includes(statusData.status)) {
        throw new Error(statusData.error || "The AI try-on could not be completed.");
      }
    }

    if (!result) {
      throw new Error("The AI try-on is taking too long. Please try again.");
    }

    userPreview.src = result;
    userPreview.classList.remove("hidden");
    resultLoading.classList.add("hidden");
  } catch (error) {
    resultLoading.innerHTML = "<strong>Try-on failed</strong><small>" + error.message + "</small>";
  } finally {
    tryBtn.disabled = false;
    tryBtn.innerHTML = "Virtual Try On <span>→</span>";
  }
});

document.querySelector("#resetBtn").addEventListener("click", () => {
  document.querySelector("#resultSection").classList.add("hidden");
  document.querySelector("#resultLoading").classList.add("hidden");
  document.querySelector("#resultLoading").innerHTML = "<span class=\"spinner\"></span><strong>Creating your virtual try-on...</strong><small>This usually takes a few seconds.</small>";
  document.querySelector("#userPreview").classList.add("hidden");
  document.querySelector("#photoInput").value = "";
  uploadedImage = null;
  document.querySelector("#uploadTitle").textContent = "Upload your photo";
  document.querySelector("#uploadHint").textContent = "PNG, JPG or WEBP";
  document.querySelector("#uploadBox").classList.remove("ready");
  refreshCards();
});

var cryptocurrencies = [['./public/imgs/bitcoin.png',"Bitcoin","USD$ 48,986.13","Cost: 0.00408279 BTC"],['./public/imgs/ethereum.png',"Ethereum","USD$ 4,165.71","Cost: 0.04801102 ETH"]]
var loaded = false;
var currentStep = "crypto-selection";
var selectedCrypto = "error";
var wallets = [[["buenbit", "./public/imgs/buenbit_logo.png"],["coinbase", "./public/imgs/coinbase-logo.png"]],[["trezor", "./public/imgs/trezor-logo.png"],["ledger", "./public/imgs/ledger-logo.png"]],[["trust", "./public/imgs/trust-wallet-logo.png"],["math", "./public/imgs/math-wallet-logo.png"]]]

var createPlugin = function(){
    if(loaded == false){
        loaded = true

        var target = document.getElementById("target")
        target.style.cssText = 'box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height: 600px;width: 400px;border: 1px solid #F5F5F5;background-color: var(--background-color);'

        var header = document.createElement("div")
        header.classList.add("row")
        header.classList.add("header")
        header.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:70px;background-color:#FFFFFF);"
        header.innerHTML = '<div class="col-11 header-content" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;border-bottom:1px solid #F5F5F5;margin:0 auto;height:70px;"> <div class="row header-row" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:70px;"> <div class="col-1 align-self-center" style="box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;"> <span id="back-button" class="material-icons" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;cursor:pointer;">arrow_back</span> </div> <div id="header-content" class="col-11 align-self-center header-title" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-align:center;font-weight:700;font-size:18px;color:var(--company-name-color);"> <img id="header-logo" class="img-fluid header-image" alt="Responsive image" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:50px;margin-right:10px;"> </div> </div> </div>'

        var title = document.createElement("div")
        title.classList.add("row")
        title.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:flex;";
        title.innerHTML = '<div class="col-1" style="box-sizing: border-box; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased;"></div> <div id="header-title" class="title col-10" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:50px;margin-top:20px;margin-bottom:20px;text-align:center;font-size:18px;color:var(--instructions-color);"> Select the cryptocurrency you want to pay with </div> <div class="col-1" style="box-sizing: border-box; -moz-osx-font-smoothing: grayscale; -webkit-font-smoothing: antialiased;"></div> </div>'

        var content = document.createElement("div")
        content.classList.add("row")
        content.classList.add("content")
        content.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:440px;overflow-y:scroll;display:flex;"
        content.innerHTML = '<div id="plugin-content" class="col-11 crypto-container" style="box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin:0 auto;"></div>'
        
        var target = document.getElementById("target")
        target.appendChild(header)
        target.appendChild(title)
        target.appendChild(content)

        var header_content = document.getElementById('header-content');
        header_content.innerText = "ACME Corp";

        var header_logo = document.getElementById('header-logo');

        createCryptoContent(cryptocurrencies);

        var back_button = document.getElementById("back-button")
        back_button.addEventListener('click', goBack, false)
    }
};

var changeTitle = function(content){
    var title = document.getElementById("header-title")
    title.textContent = content
}

var createCryptoRow = function(image,title,exchange_rate,final_price){
    var crypto_row = document.createElement("div")
    crypto_row.classList.add(title.toLowerCase())
    crypto_row.classList.add("row")
    crypto_row.classList.add("crypto-row")
    crypto_row.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;border:1px solid #F5F5F5;height:100px;margin-bottom:10px;border-radius:5px;cursor:pointer;background-color:var(--row-color);"
    
    var crypto_image_container = document.createElement("div")
    crypto_image_container.classList.add(title.toLowerCase())
    crypto_image_container.classList.add("col-3")
    crypto_image_container.classList.add("align-self-center")
    crypto_image_container.style.cssText = "box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;"

    var crypto_image = document.createElement("img")
    crypto_image.classList.add(title.toLowerCase())
    crypto_image.classList.add("img-fluid")
    crypto_image.classList.add("crypto-image")
    crypto_image.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;height:70%;"
    crypto_image.src = image

    var crypto_info = document.createElement("div")
    crypto_info.classList.add(title.toLowerCase())
    crypto_info.classList.add("col-9")
    crypto_info.classList.add("align-self-center")
    crypto_info.classList.add("crypto-info")
    crypto_info.style.cssText = "box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;"
    
    var crypto_title = document.createElement("div")
    crypto_title.classList.add(title.toLowerCase())
    crypto_title.classList.add("row")
    crypto_title.classList.add("crypto-title")
    crypto_title.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-weight:700;font-size:16px;color:var(--coin-name-color);"
    crypto_title.textContent = title
    
    var crypto_exchange_rate = document.createElement("div")
    crypto_exchange_rate.classList.add(title.toLowerCase())
    crypto_exchange_rate.classList.add("row")
    crypto_exchange_rate.classList.add("crypto-exchange-rate")
    crypto_exchange_rate.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:500;color:var(--exchange-rate-color);"
    crypto_exchange_rate.textContent = exchange_rate
    
    var crypto_final_price = document.createElement("div")
    crypto_final_price.classList.add(title.toLowerCase())
    crypto_final_price.classList.add("row")
    crypto_final_price.classList.add("crypto-final-price")
    crypto_final_price.style.cssText = "box-sizing:border-box;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:500;color:var(--final-price-color);"
    crypto_final_price.textContent = final_price

    crypto_row.appendChild(crypto_image_container)
    crypto_image_container.appendChild(crypto_image)

    crypto_row.appendChild(crypto_info)
    crypto_info.appendChild(crypto_title)
    crypto_info.appendChild(crypto_exchange_rate)
    crypto_info.appendChild(crypto_final_price)

    var plugin_content = document.getElementById("plugin-content")
    plugin_content.appendChild(crypto_row)

    crypto_row.addEventListener('click', goToWallets, false);
};

var createCryptoContent = function(content){
    for(var i = 0; i<content.length; i++){
        var cryptocurrency = content[i]
        var image = cryptocurrency[0]
        var title = cryptocurrency[1]
        var exchange_rate = cryptocurrency[2]
        var final_price = cryptocurrency[3]
        createCryptoRow(image,title,exchange_rate,final_price)
    }
};

var createWalletRow = function(){
    var wallet_row = document.createElement("div");
    wallet_row.classList.add('row')
    wallet_row.classList.add('wallet-row')
    wallet_row.style.cssText = "box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;height: 140px;margin: 0 auto;margin-bottom: 20px !important;"

    return wallet_row;
};

var createWallet = function(title,image,target){
    var wallet = document.createElement("div");
    wallet.classList.add(title);
    wallet.classList.add("col-5");
    wallet.classList.add("wallet");
    wallet.classList.add("align-self-center");
    wallet.style.cssText = "box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;height: 140px;border: 1px solid #F5F5F5;display: flex;cursor: pointer;background-color: var(--block-color);margin: auto!important;";

    var wallet_image = document.createElement("img");
    wallet_image.classList.add("img-fluid");
    wallet_image.classList.add("wallet-image");
    wallet_image.style.cssText = "box-sizing: border-box;-moz-osx-font-smoothing: grayscale;-webkit-font-smoothing: antialiased;margin: auto;";
    
    wallet_image.src = image;

    wallet.appendChild(wallet_image);
    target.appendChild(wallet);
};

var createWalletContent = function(content){
    for(var i = 0; i<wallets.length; i++){
        var wallets_row = wallets[i];
        var wallet_row_element = createWalletRow();

        for(var s = 0; s<wallets_row.length; s++){
            var wallet = wallets_row[s];
            var wallet_title = wallet[0];
            var wallet_image = wallet[1];
            createWallet(wallet_title,wallet_image,wallet_row_element);
        };

        var plugin_content = document.getElementById("plugin-content")
        plugin_content.appendChild(wallet_row_element)

    };
};

var eraseContent = function(element){
    element.innerHTML = ""
};

var goToWallets = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    selectedCrypto = target.classList[0];
    
    changeTitle("Select the wallet you will want to pay with")

    var plugin_content = document.getElementById("plugin-content");
    eraseContent(plugin_content);

    currentStep = "wallet-selection";
    createWalletContent(wallets);
};

var goToCryptos = function(){
    changeTitle("Select the cryptocurrency you want to pay with")

    var plugin_content = document.getElementById("plugin-content");
    eraseContent(plugin_content);

    createCryptoContent(cryptocurrencies);
};

var goBack = function() {
    if(currentStep == "wallet-selection"){
        goToCryptos()
        currentStep = "crypto-selection"
    }
};
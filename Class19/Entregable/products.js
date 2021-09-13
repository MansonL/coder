"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fsPromises = require("fs/promises");
var moment = require("moment");
var path = require("path");
var uuid_1 = require("uuid");
var randomNumber = function (type) {
    if (type === 'price') {
        return Number((Math.random() * (5000.0 - 100.0 + 1) + 100.0).toFixed(2));
    }
    else {
        return Number((Math.random() * (1000 - 0 + 1) + 0).toFixed(0));
    }
};
var productsPath = path.resolve(__dirname + '/products.json');
var products = [
    {
        name: 'Beef Choice Angus Rump Roast, 2.25 - 3.87 lb',
        description: "There's nothing like cooking from scratch, especially when you start with our Beef Choice Angus Rump Roast. Made with quality USDA Choice Angus beef our roast is a savory cut with natural tenderness and exceptional taste. ",
        img: "https://i5.walmartimages.com/asr/31be53bc-c0cc-411d-83fe-b564abf44c28.016f3ba5bc2487abce159acf6051b27b.png?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "HARRIS FARMS CERAMIC NESTING EGGS WHITE",
        description: "Harris Farms CERAMIC NESTING EGGS-White. Use for encourage hens to lay eggs inside nesting box and determine if a hen is ready to lay. Discourage chickens from eating eggs and also used as a decorative item.",
        img: "https://i5.walmartimages.com/asr/67915ce5-df83-4e53-825e-82f2b7c80136.d994d81e0cf8aee3a395cb0b933d06a4.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Great Value Long Grain Enriched Rice, 320 oz",
        description: "Keep your body in optimal shape with the right food such as this Great Value Long-Grain Enriched Rice. This product is simply pure with absolutely no artificial flavors or colors added. This nutritious Great Value rice cooks quickly and efficiently on the stovetop or in a rice cooker and gives you premium quality for an excellent value. ",
        img: "https://i5.walmartimages.com/asr/77b5ab4d-14fd-4fb2-9cd6-8aa6c3f18e2e_1.f940b3bfded7a5a097c2b11887643144.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "John Soules Foods Chicken Fajitas, 16oz",
        description: "John Soules Foods Fully Cooked Chicken Fajitas. It is important to us that all of our products are made with the same care and ingredients you would make for your family. At John Soules Foods our goal is to give you the best quality product we can make.",
        img: "https://i5.walmartimages.com/asr/1f819423-8ce1-4491-a770-c11c61db4828_3.c23e25eeb6851afc1df99f6b6797777d.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Great Value Sliced Potatoes, 14.46 oz",
        description: "Great Value Sliced Potatoes are a classic side dish loved by all. Our hearty, sliced potatoes cut time-consuming peeling out of the equation. Season with salt, pepper, garlic, and butter for a great-tasting nutritious side. Serve with your favorite meats and vegetables for a satisfying, healthy meal. Incredibly versatile, these vegetables are the perfect addition to stews, casseroles, and pot pies. Our pre-peeled and sliced veggies are great for making scalloped or au-gratin style potatoes, in a potato salad, and so much more. Great Value sliced potatoes are a good source of dietary fiber, iron, and potassium. They are gluten-free and kosher. They require no refrigeration and are easy to stock up on. No matter how you choose to use them, Great Value Sliced Potatoes will be a favorite ingredient to have in your pantry.",
        img: "https://i5.walmartimages.com/asr/bcf482ca-ba05-453c-b45f-009aea81be51_2.2f62fa0b4cb05d2e4d507851f30b2fee.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Optimum Nutrition Gold Standard 100% Whey Protein Powder, Double Rich Chocolate, 24g Protein, 1.5 LB",
        description: "Optimum Nutrition's Gold Standard 100% Whey is the Most Awarded, Best-Selling, Whey Protein Powder on the Planet.* Whey Protein Isolates are the purest and most expensive form of whey protein that exists. That's why they are the first ingredients you read on the Gold Standard 100% Whey label. By using Whey Protein Isolates as our primary protein source, we're able to pack in 24 grams of the purest protein with a lot less of the fat, lactose, and other stuff that you can do without.",
        img: "https://i5.walmartimages.com/asr/8ffa2a27-ac9c-4c15-850f-b02d2f01ea3a.dd1fafe645a472790b658a602641c1ef.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Hass Avocados",
        description: "Avocados aren\u2019t just great-tasting fresh produce items, but they are a nutrient-dense food enjoyed around the world. Because of the creamy texture and mild flavor of Hass avocados, they are a versatile ingredient that can be used in many different types of recipes and dishes. ",
        img: "https://i5.walmartimages.com/asr/098962b7-7d67-4ff5-a3c9-047c430f8fea_1.5847cdd72fa776356460d77b0b3c9301.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Chicken of the Sea Skinless Boneless Wild Caught Pink Salmon Pouch, 5 oz",
        description: "Pink Salmon, known for its mild taste, is caught from the cold, clear waters in Alaska. To protect the cleanest waters in the world, Chicken of the Sea Salmon is certified by the Marine Steward Ship Council (MSC), offering the highest quality, sustainable Salmon. ",
        img: "https://i5.walmartimages.com/asr/17da74f9-474f-45b2-8ff2-eba681041b26.c2c3b3e87cafd6533e4153a04e711459.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Hurst Hambeens 15 Bean Soup, Cajun, 20 oz",
        description: "Make a delicious meal quickly and easily with this Hurst's HamBeens with Seasoning Packet Cajun 15 Bean Soup. It includes 20 oz of 15 different types of beans and a cajun seasoning packet. It offers a tasty and classic ham and bean soup recipe.Hurst's HamBeens with Seasoning Packet Cajun 15 Bean Soup, 20 oz:Hurst's cajun seasoning packetHigh fiber20 oz of low-fat soup.",
        img: "https://i5.walmartimages.com/asr/a44d61bd-3921-44c0-be32-21512fcd7515_1.25ab65c7e29eaa575bd8f9d2ebc16fa0.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
    {
        name: "Ocean's Halo, Organic, Vegan, Gluten-free, Non-GMO, Sushi Nori, 1 oz.",
        description: "Bring sushi night home with our full Sushi Nori seaweed sheets, perfect for making your own sushi rolls and hand rolls at home! Serve it with rice and your favorite toppings, like avocado or cucumbers, then pair it with our No Soy Sauce or Less Sodium No Soy Sauce for a perfect dipping combination!",
        img: "https://i5.walmartimages.com/asr/4e9b2786-c9ea-44e7-8b31-5829eece3c29_1.f4f5370159c5409438cfaa0ecfd0e9e2.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff",
        code: "",
        timestamp: "",
        price: 0,
        stock: 0
    },
];
var addingProperties = function (products) {
    products.forEach(function (product) {
        product.timestamp = moment().format('LLL');
        product.code = (0, uuid_1.v4)();
        product.price = randomNumber('price');
        product.stock = randomNumber('stock');
    });
};
var addProducts = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                addingProperties(products);
                return [4 /*yield*/, fsPromises.writeFile(productsPath, JSON.stringify(products, null, '\t'))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
addProducts();

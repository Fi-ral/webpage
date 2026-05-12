namespace CountersApp {
    let totalCount = 0;
    let correctCount = 0;
    let currentStreak = 0;
    let maxStreak = 0;
    let hasQuestion = false;
    let currentCounter: typeof COUNTERS[keyof typeof COUNTERS] | null = null;
    let currentCounterKey: string | null = null;
    let currentNumber: number = 1;  // 1–10 = normal, 11 = 何
    let currentWord: { ja: string; en: string } | null = null;

    const NUMBER_POOL: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const COUNTERS = {
        '枚': {
            counts: {
                1: ['いちまい'],
                2: ['にまい'],
                3: ['さんまい'],
                4: ['よんまい'],
                5: ['ごまい'], 
                6: ['ろくまい'], 
                7: ['ななまい'], 
                8: ['はちまい'],
                9: ['きゅうまい'],
                10: ['じゅうまい'],
                11: ['なんまい']
            },
            words: [
                {ja:'紙', en:'paper'}, 
                {ja:'皿', en:'plate'}, 
                {ja:'シャツ', en:'shirt'},
                {ja:'タオル', en:'towel'}, 
                {ja:'コイン', en:'coin'}, 
                {ja:'切手', en:'stamp'},
                {ja:'写真', en:'photo'}, 
                {ja:'ピザ', en:'pizza'}
            ]
        },
        '本': {
            counts: {
                1: ['いっぽん'], 
                2: ['にほん'], 
                3: ['さんぼん'], 
                4: ['よんほん'],
                5: ['ごほん'], 
                6: ['ろっぽん'],
                7: ['ななほん'], 
                8: ['はっぽん'],
                9: ['きゅうほん'], 
                10: ['じゅっぽん','じっぽん'], 
                11: ['なんぼん']
            },
            words: [
                {ja:'鉛筆', en:'pencil'}, 
                {ja:'ペン', en:'pen'}, 
                {ja:'ビール', en:'beer'},
                {ja:'木', en:'tree'}, 
                {ja:'にんじん', en:'carrot'},
                {ja:'バナナ', en:'banana'},
                {ja:'傘', en:'umbrella'}, 
                {ja:'ロープ', en:'rope'},
                {ja:'指', en:'finger'}
            ]
        },
        '個': {
            counts: {
                1: ['いっこ'], 
                2: ['にこ'],
                3: ['さんこ'],
                4: ['よんこ'],
                5: ['ごこ'],
                6: ['ろっこ'],
                7: ['ななこ'],
                8: ['はっこ'],
                9: ['きゅうこ'],
                10: ['じゅっこ','じっこ'],
                11: ['なんこ']
            },
            words: [
                {ja:'りんご', en:'apple'}, 
                {ja:'みかん', en:'mandarin'}, 
                {ja:'石', en:'stone'},
                {ja:'キャンディ', en:'candy'}, 
                {ja:'電池', en:'battery'}, 
                {ja:'ボタン', en:'button'},
                {ja:'卵', en:'egg'}, 
                {ja:'消しゴム', en:'eraser'}
            ]
        },
        '冊': {
            counts: {
                1: ['いっさつ'],
                2: ['にさつ'],
                3: ['さんさつ'],
                4: ['よんさつ'],
                5: ['ごさつ'],
                6: ['ろくさつ'],
                7: ['ななさつ'],
                8: ['はっさつ'],
                9: ['きゅうさつ'],
                10: ['じゅっさつ','じっさつ'],
                11: ['なんさつ']
            },
            words: [
                {ja:'本', en:'book'},
                {ja:'雑誌', en:'magazine'},
                {ja:'ノート', en:'notebook'},
                {ja:'辞書', en:'dictionary'},
                {ja:'漫画', en:'manga'},
                {ja:'図鑑', en:'illustrated guide'},
                {ja:'教科書', en:'textbook'}
            ]
        },
        '回': {
            counts: {
                1: ['いっかい'],
                2: ['にかい'],
                3: ['さんかい'],
                4: ['よんかい'],
                5: ['ごかい'],
                6: ['ろっかい'],
                7: ['ななかい'],
                8: ['はっかい'],
                9: ['きゅうかい'],
                10: ['じゅっかい'],
                11: ['なんかい']
            },
            words: [
                {ja:'練習', en:'practice'},
                {ja:'テスト', en:'test'},
                {ja:'会議', en:'meeting'},
                {ja:'食事', en:'meal'},
                {ja:'旅行', en:'trip'},
                {ja:'授業', en:'lesson'},
                {ja:'試合', en:'match'}
            ]
        },
        '匹': {
            counts: {
                1: ['いっぴき'],
                2: ['にひき'],
                3: ['さんびき'],
                4: ['よんひき'],
                5: ['ごひき'],
                6: ['ろっぴき'],
                7: ['ななひき'],
                8: ['はっぴき'],
                9: ['きゅうひき'],
                10: ['じゅっぴき'],
                11: ['なんびき']
            },
            words: [
                {ja:'猫', en:'cat'},
                {ja:'犬', en:'dog'},
                {ja:'魚', en:'fish'},
                {ja:'虫', en:'insect'},
                {ja:'ねずみ', en:'mouse'},
                {ja:'うさぎ', en:'rabbit'},
                {ja:'ハムスター', en:'hamster'},
                {ja:'カエル', en:'frog'}
            ]
        },
        '頭': {
            counts: {
                1: ['いっとう'],
                2: ['にとう'],
                3: ['さんとう'],
                4: ['よんとう'],
                5: ['ごとう'],
                6: ['ろくとう'],
                7: ['ななとう'],
                8: ['はっとう'],
                9: ['きゅうとう'],
                10: ['じゅっとう'],
                11: ['なんとう']
            },
            words: [
                {ja:'牛', en:'cow'},
                {ja:'馬', en:'horse'},
                {ja:'象', en:'elephant'},
                {ja:'ライオン', en:'lion'},
                {ja:'クマ', en:'bear'},
                {ja:'キリン', en:'giraffe'},
                {ja:'クジラ', en:'whale'}
            ]
        },
        '羽': {
            counts: {
                1: ['いちわ'],
                2: ['にわ'],
                3: ['さんわ'],
                4: ['よんわ'],
                5: ['ごわ'],
                6: ['ろくわ'],
                7: ['ななわ'],
                8: ['はちわ'],
                9: ['きゅうわ'],
                10: ['じゅうわ'],
                11: ['なんわ']
            },
            words: [
                {ja:'鳥', en:'bird'},
                {ja:'ニワトリ', en:'chicken'},
                {ja:'ハト', en:'pigeon'},
                {ja:'インコ', en:'parakeet'},
                {ja:'ツバメ', en:'swallow'},
                {ja:'ウサギ', en:'rabbit'},
                {ja:'タカ', en:'hawk'}
            ]
        },
        '杯': {
            counts: {
                1: ['いっぱい'],
                2: ['にはい'], 
                3: ['さんばい'], 
                4: ['よんはい'],
                5: ['ごはい'],
                6: ['ろっぱい'],
                7: ['ななはい'],
                8: ['はっぱい'],
                9: ['きゅうはい'],
                10: ['じゅっぱい'],
                11: ['なんばい']
            },
            words: [
                {ja:'コーヒー', en:'coffee'},
                {ja:'お茶', en:'tea'},
                {ja:'ビール', en:'beer'},
                {ja:'水', en:'water'},
                {ja:'ジュース', en:'juice'},
                {ja:'ワイン', en:'wine'},
                {ja:'ラーメン', en:'ramen'},
                {ja:'みそ汁', en:'miso soup'}
            ]
        },
        '台': {
            counts: {
                1: ['いちだい'],
                2: ['にだい'],
                3: ['さんだい'],
                4: ['よんだい'],
                5: ['ごだい'],
                6: ['ろくだい'],
                7: ['ななだい'],
                8: ['はちだい'],
                9: ['きゅうだい'],
                10: ['じゅうだい'],
                11: ['なんだい']
            },
            words: [
                {ja:'車', en:'car'},
                {ja:'自転車', en:'bicycle'},
                {ja:'テレビ', en:'TV'},
                {ja:'パソコン', en:'computer'},
                {ja:'洗濯機', en:'washing machine'},
                {ja:'冷蔵庫', en:'refrigerator'},
                {ja:'バイク', en:'motorcycle'},
                {ja:'カメラ', en:'camera'}
            ]
        },
        '階': {
            counts: {
                1: ['いっかい'],
                2: ['にかい'],
                3: ['さんかい', 'さんがい'],
                4: ['よんかい'],
                5: ['ごかい'],
                6: ['ろっかい'], 
                7: ['ななかい'],
                8: ['はっかい'],
                9: ['きゅうかい'],
                10: ['じゅっかい'],
                11: ['なんかい', 'なんがい']
            },
            words: [
                {ja:'部屋', en:'room'},
                {ja:'オフィス', en:'office'},
                {ja:'レストラン', en:'restaurant'},
                {ja:'ホテル', en:'hotel'},
                {ja:'病院', en:'hospital'},
                {ja:'図書館', en:'library'},
                {ja:'マンション', en:'apartment'}
            ]
        },
        '人': {
            counts: {
                1: ['ひとり'],
                2: ['ふたり'],
                3: ['さんにん'],
                4: ['よにん'],
                5: ['ごにん'],
                6: ['ろくにん'],
                7: ['ななにん','しちにん'],
                8: ['はちにん'],
                9: ['きゅうにん','くにん'],
                10: ['じゅうにん'],
                11: ['なんにん']
            },
            words: [
                {ja:'学生', en:'student'},
                {ja:'先生', en:'teacher'},
                {ja:'友達', en:'friend'},
                {ja:'子供', en:'child'},
                {ja:'お客さん', en:'customer'},
                {ja:'社員', en:'employee'},
                {ja:'家族', en:'family member'}
            ]
        },
        '歳': {
            counts: {
                1: ['いっさい'],
                2: ['にさい'],
                3: ['さんさい'],
                4: ['よんさい'],
                5: ['ごさい'],
                6: ['ろくさい'],
                7: ['ななさい'],
                8: ['はっさい'],
                9: ['きゅうさい'], 
                10: ['じゅっさい','じゅうさい'],
                11: ['なんさい']
            },
            words: [
                {ja:'歳', en:'years'},
            ]
        },
        '分': {
            counts: {
                1: ['いっぷん'],
                2: ['にふん'],
                3: ['さんぷん'],
                4: ['よんぷん'],
                5: ['ごふん'],
                6: ['ろっぷん'],
                7: ['ななふん'],
                8: ['はっぷん'],
                9: ['きゅうふん'],
                10: ['じゅっぷん'],
                11: ['なんぷん']
            },
            words: [
                {ja:'授業', en:'lesson'},
                {ja:'休憩', en:'break'},
                {ja:'ランニング', en:'running'},
                {ja:'料理', en:'cooking'},
                {ja:'電話', en:'phone call'},
                {ja:'シャワー', en:'shower'},
                {ja:'散歩', en:'walk'}
            ]
        }
    };

    function displayResult(): void {
        const overallResult = document.getElementById("display-overall-result") as HTMLParagraphElement;
        const streakResult = document.getElementById("display-streak-result") as HTMLInputElement;
        const bestStreakResult = document.getElementById("display-best-streak-result") as HTMLInputElement;

        overallResult.textContent = `${correctCount}/${totalCount} (${correctCount !== 0 ? `${Math.round(correctCount/totalCount * 100).toFixed(1)}%` : "0.0%"})`
        streakResult.textContent = `Current Streak: ${currentStreak}`
        bestStreakResult.textContent = `Best Streak: ${maxStreak}`
    }
    function getActiveCounters(): string[] {
        const spans = document.querySelectorAll(".counter-selection span");
        const active: string[] = [];

        spans.forEach(span => {
            const checkbox = span.querySelector("input[type='checkbox']") as HTMLInputElement;
            if (checkbox?.checked) {
                const kanji = span.textContent?.trim()[1];
                if (kanji && kanji in COUNTERS) active.push(kanji);
            }
        });

        return active;
    }
    function isCorrect(answer: string): boolean {
        if (!currentCounter || currentNumber === null) 
            return false;

        const validAnswers = currentCounter.counts[currentNumber as keyof typeof currentCounter.counts];
        return validAnswers?.includes(answer) ?? false;
    }
    function clearAnswer(isCorrect: boolean, givenAnswer: string): void {
        if (!currentCounter || currentNumber === null) 
            return;

        const romajiOutput = document.getElementById("romaji-output") as HTMLParagraphElement;
        const romajiInput = document.getElementById("romaji-input") as HTMLInputElement;
        const validAnswers = currentCounter.counts[currentNumber as keyof typeof currentCounter.counts]

        romajiOutput.innerHTML = isCorrect ? `Correct: ${givenAnswer}` : `Incorrect: ${validAnswers}`;
        romajiInput.value = "";

        if (isCorrect) {
            romajiOutput.style.color = "var(--green-color)";
            romajiOutput.style.fontWeight = "bold";
        } 
        else {
            romajiOutput.style.color = "var(--red-color)"
            romajiOutput.style.fontWeight = "bold";
        }
    }
    
    export function createNewQuestion(): void {
        const displayKanji   = document.getElementById("counter-word-kanji")   as HTMLSpanElement;
        const displayEnglish = document.getElementById("counter-word-english") as HTMLSpanElement;
        const displayNumber  = document.getElementById("counter-word-number")  as HTMLSpanElement;
        const showCounter    = (document.getElementById("setting-display-counter") as HTMLInputElement|null)?.checked === true ? true : false;
        const showEnglish    = (document.getElementById("setting-display-english") as HTMLInputElement|null)?.checked === true ? true : false;

        const activeKeys = getActiveCounters();
        if (activeKeys.length === 0) {
            displayKanji.textContent = "No counters selected.";
            hasQuestion = false;
            return;
        }

        hasQuestion       = true;
        currentCounterKey = activeKeys[Math.floor(Math.random() * activeKeys.length)];
        currentCounter    = COUNTERS[currentCounterKey as keyof typeof COUNTERS];
        currentNumber     = NUMBER_POOL[Math.floor(Math.random() * NUMBER_POOL.length)];
        currentWord       = currentCounter.words[Math.floor(Math.random() * currentCounter.words.length)];

        displayKanji.textContent   = currentWord.ja;

        if (showEnglish) {
            displayEnglish.textContent = currentWord.en;
        } 
        else {
            displayEnglish.textContent = "";
        }

        displayNumber.textContent  = currentNumber === 11
            ? `何${showCounter ? currentCounterKey : "〇"}？`
            : `${currentNumber}${showCounter ? currentCounterKey : "〇"}`;
    }
    export function main(answer: string) {
        totalCount++;
        const correct = isCorrect(answer)

        if (!hasQuestion) {
            clearAnswer(false, "\u2003");
            createNewQuestion();
            return;
        }

        if (correct) {
            correctCount++;
            currentStreak++;
        }
        else {
            currentStreak = 0;
        }

        if (currentStreak > maxStreak && hasQuestion) {
            maxStreak = currentStreak
        }

        clearAnswer(correct, answer);
        displayResult();
        createNewQuestion();
    }
}
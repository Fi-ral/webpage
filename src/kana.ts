namespace KanaApp {
    const ROMAJI_MAP: Map<string, string> = (() => {
        const m: Map<string, string> = new Map();
        const add = (r: string, k: string) => m.set(r, k);
        
        // *
        add('a','あ'); add('i','い'); add('u','う'); add('e','え'); add('o','お');
        
        // K
        add('ka','か'); add('ki','き'); add('ku','く'); add('ke','け'); add('ko','こ');
        add('kya','きゃ'); add('kyu','きゅ'); add('kyo','きょ');
        
        // S
        add('sa','さ'); add('si','し'); add('su','す'); add('se','せ'); add('so','そ');
        add('shi','し');
        add('sha','しゃ'); add('shu','しゅ'); add('sho','しょ');
        add('sya','しゃ'); add('syu','しゅ'); add('syo','しょ');
        
        // T
        add('ta','た'); add('ti','ち'); add('tu','つ'); add('te','て'); add('to','と');
        add('tsu','つ'); add('chi','ち');
        add('cha','ちゃ'); add('chu','ちゅ'); add('cho','ちょ');
        add('tya','ちゃ'); add('tyu','ちゅ'); add('tyo','ちょ');
        add('thi','てぃ'); add('tha','てゃ'); add('thu','てゅ'); add('tho','てょ');
        
        // N
        add('na','な'); add('ni','に'); add('nu','ぬ'); add('ne','ね'); add('no','の');
        add('nya','にゃ'); add('nyu','にゅ'); add('nyo','にょ');
        
        // H
        add('ha','は'); add('hi','ひ'); add('hu','ふ'); add('he','へ'); add('ho','ほ');
        add('fu','ふ');
        add('hya','ひゃ'); add('hyu','ひゅ'); add('hyo','ひょ');
        add('fa','ふぁ'); add('fi','ふぃ'); add('fe','ふぇ'); add('fo','ふぉ');
        
        // M
        add('ma','ま'); add('mi','み'); add('mu','む'); add('me','め'); add('mo','も');
        add('mya','みゃ'); add('myu','みゅ'); add('myo','みょ');
        
        // Y
        add('ya','や'); add('yu','ゆ'); add('yo','よ');
        
        // R
        add('ra','ら'); add('ri','り'); add('ru','る'); add('re','れ'); add('ro','ろ');
        add('rya','りゃ'); add('ryu','りゅ'); add('ryo','りょ');
        
        // W
        add('wa','わ'); add('wi','ゐ'); add('we','ゑ'); add('wo','を');
        
        // G
        add('ga','が'); add('gi','ぎ'); add('gu','ぐ'); add('ge','げ'); add('go','ご');
        add('gya','ぎゃ'); add('gyu','ぎゅ'); add('gyo','ぎょ');
        
        // Z / J
        add('za','ざ'); add('zi','じ'); add('zu','ず'); add('ze','ぜ'); add('zo','ぞ');
        add('ji','じ');
        add('ja','じゃ'); add('ju','じゅ'); add('jo','じょ');
        add('jya','じゃ'); add('jyu','じゅ'); add('jyo','じょ');
        add('zya','じゃ'); add('zyu','じゅ'); add('zyo','じょ');
        
        // D
        add('da','だ'); add('di','ぢ'); add('du','づ'); add('de','で'); add('do','ど');
        add('dzu','づ');
        add('dya','ぢゃ'); add('dyu','ぢゅ'); add('dyo','ぢょ');

        // B
        add('ba','ば'); add('bi','び'); add('bu','ぶ'); add('be','べ'); add('bo','ぼ');
        add('bya','びゃ'); add('byu','びゅ'); add('byo','びょ');
        
        // P
        add('pa','ぱ'); add('pi','ぴ'); add('pu','ぷ'); add('pe','ぺ'); add('po','ぽ');
        add('pya','ぴゃ'); add('pyu','ぴゅ'); add('pyo','ぴょ');

        // V
        add('va','ゔぁ'); add('vi','ゔぃ'); add('vu','ゔぅ'); add('ve','ゔぇ'); add('vo','ゔぉ');
        
        // *
        add('xa','ぁ'); add('xi','ぃ'); add('xu','ぅ'); add('xe','ぇ'); add('xo','ぉ');
        add('xya','ゃ'); add('xyu','ゅ'); add('xyo','ょ');
        add('xtu','っ'); add('xtsu','っ');
        add('xka','ヵ'); add('xke','ヶ');
        add('...', '…') 
        add('.','。'); add(',', '、'); add('~', '〜'); add('-', 'ー'); add('*', '・'); add('?', '？'); add('!', '！')
        
        return m;
    })();

    function convertRomaji(str: string) {
        if (!str)
            return '';

        const s = str.toLowerCase();
        let res = '';
        let i = 0;
        const VOWELS = new Set(['a','i','u','e','o']);
        const CONSONANTS = 'bcdfghjklmnpqrstvwxyz';
        
        while (i < s.length) {
            const c = s[i];
        
            if (c === 'n') {
                const next = s[i + 1];
                if (!next) { 
                    res += 'ん'; 
                    i++; continue; 
                }
                if (next === 'n') {
                    res += 'ん'; 
                    i += 2; continue;
                }
                if (!VOWELS.has(next) && next !== 'y') { 
                    res += 'ん';
                    i++; 
                    continue;
                }
            }
        
            if (CONSONANTS.includes(c) && c !== 'n' && s[i + 1] === c) {
                res += 'っ';
                i++;
                continue;
            }
        
            let matched = false;
            for (let len = Math.min(4, s.length - i); len >= 1; len--) {
                const chunk = s.slice(i, i + len);
                if (ROMAJI_MAP.has(chunk)) {
                    res += ROMAJI_MAP.get(chunk);
                    i += len;
                    matched = true;
                    break;
                }
            }
        
            if (!matched) {
                const code = s.codePointAt(i)!;
                if (code > 127) {
                    res += String.fromCodePoint(code);
                    i += code > 0xffff ? 2 : 1;
                } 
                else {
                    res += c;
                    i++;
                }
            }
        }

        const asKatakana = (document.getElementById("setting-katakana-output") as HTMLInputElement|null)?.checked === true ? true : false;
        if (asKatakana) {
            return toKatakana(res);
        }
        return toHiragana(res);
    }
    
    function toHiragana(text: string) {
        return text.replace(/[\u30A1-\u30F6]/g, (match) => {
            return String.fromCharCode(match.charCodeAt(0) - 0x60);
        });
    };
    function toKatakana(text: string) {
    return text.replace(/[\u3041-\u3096]/g, (match) => {
        return String.fromCharCode(match.charCodeAt(0) + 0x60);
    });
    };

    export function convert(finished: boolean): void {
        const output = document.getElementById("romaji-output") as HTMLParagraphElement;
        const input = document.getElementById("romaji-input") as HTMLInputElement;

        if (input === null || output === null) {
            console.error("Could not find text input target or kana output!")
            return;
        }

        const res = convertRomaji(input.value)
        output.style = ""
        if (res !== "") {
            output.textContent = res;
        } else {
            output.innerHTML = "<i>Enter romaji below to begin.</i>"
        }

        if (!finished)
            return;

        if (typeof CountersApp !== 'undefined') {
            CountersApp.main(res);
        }
    }

    window.addEventListener("load", (event) => {
        convert(false);
    });
}
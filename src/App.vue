<template>
    <main class="page">
        <div class="container">
            <div class="terminal">
                <div class="terminal-header">
                    <div class="dot dot-red"></div>
                    <div class="dot dot-yellow"></div>
                    <div class="dot dot-green"></div>
                    <div class="terminal-title">hoonee@ujuro: ~</div>
                </div>
                <div class="terminal-body">
                    <div class="ascii">██╗   ██╗     ██╗██╗   ██╗██████╗  ██████╗
██║   ██║     ██║██║   ██║██╔══██╗██╔═══██╗
██║   ██║     ██║██║   ██║██████╔╝██║   ██║
██║   ██║██   ██║██║   ██║██╔══██╗██║   ██║
╚██████╔╝╚█████╔╝╚██████╔╝██║  ██║╚██████╔╝
 ╚═════╝  ╚════╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ </div>
                    <span class="line"><span class="prompt">$</span> <span class="typewriter">git status</span></span>
                    <span class="line"><span class="comment"># On branch </span><span class="keyword">launch/ujuro</span></span>
                    <span class="line"><span class="comment"># Status: </span><span class="var">preparing for launch...</span></span>
                    <span class="line">&nbsp;</span>
                    <span class="line"><span class="prompt">$</span> cat <span class="string">README.md</span></span>
                    <span class="line"><span class="comment"># 안녕하세요 👋</span></span>
                    <span class="line"><span class="comment"># ujuro 서비스가 곧 시작됩니다!</span></span>
                    <span class="line"><span class="comment"># 새로운 경험으로 곧 찾아뵐게요.</span></span>
                    <span class="line">&nbsp;</span>
                    <span class="line"><span class="prompt">$</span> echo <span class="string">$LAUNCH</span></span>
                    <span class="line"><span class="var">Coming Soon</span></span>
                    <span class="line">&nbsp;</span>
                    <span class="line"><span class="prompt">$</span> <span class="blink-cursor"></span></span>
                </div>
                <div class="links">
                    <a class="link" href="https://github.com/hoonee-math" target="_blank" rel="noopener">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                        github.com/hoonee-math
                    </a>
                    <a class="link" href="mailto:kwanghoon041@gmail.com">
                        ✉ kwanghoon041@gmail.com
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
});
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app {
    height: 100%;
}
body {
    font-family: 'D2Coding', 'Cascadia Code', 'Consolas', 'Menlo', monospace;
    background: #0d1117;
    color: #c9d1d9;
}

.page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.container {
    width: 100%;
    max-width: 640px;
}

.terminal {
    background: #161b22;
    border: 1px solid #30363d;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.terminal-header {
    background: #21262d;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid #30363d;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }

.terminal-title {
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
    color: #7d8590;
    transform: translateX(-30px);
}

.terminal-body {
    padding: 24px 28px;
    font-size: 14px;
    line-height: 1.7;
    min-height: 360px;
}

.prompt { color: #7ee787; }
.path { color: #79c0ff; }
.comment { color: #8b949e; }
.string { color: #a5d6ff; }
.keyword { color: #ff7b72; }
.var { color: #ffa657; }
.line { display: block; }

.blink-cursor {
    display: inline-block;
    width: 8px;
    height: 16px;
    background: #c9d1d9;
    vertical-align: text-bottom;
    margin-left: 2px;
    animation: blink 1s steps(2) infinite;
}
@keyframes blink {
    50% { opacity: 0; }
}

.ascii {
    color: #ff7b72;
    font-size: 10px;
    line-height: 1.2;
    margin-bottom: 16px;
    white-space: pre;
    overflow-x: auto;
}

.links {
    padding: 16px 28px;
    background: #0d1117;
    border-top: 1px solid #30363d;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 13px;
}

.link {
    color: #58a6ff;
    text-decoration: none;
    border: 1px solid #30363d;
    padding: 6px 12px;
    border-radius: 6px;
    transition: all 0.15s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}
.link:hover {
    background: #1f2937;
    border-color: #58a6ff;
}
</style>

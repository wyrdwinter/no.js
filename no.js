// ==UserScript==
// @name         no
// @namespace    https://github.com/wyrdwinter
// @version      0.1
// @description  no
// @author       wyrd
// @match        https://nwn.sinfar.net/webclient.php
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict'

    const channels = [
        '.chat-channel-132', // FFA
        '.chat-channel-104' // Event
    ]

    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type === 'childList') {
                for (const post of m.addedNodes) {
                    if (post.nodeName === 'TR') {
                        for (const channel of channels) {
                            if (post.querySelectorAll(channel).length > 0) {
                                // hide this shit
                                post.style.display = 'none'

                                // quell the title alert; reference sinfar js
                                window.windowActive = false
                                window.stopAlertMsg()
                            }
                        }
                    }
                }
            }
        }
    })

    observer.observe(document.querySelector('#table-chat-messages'), {
        childList: true,
        subtree: true
    })
})()

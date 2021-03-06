import db from '../lib/database.js'

import MessageType from '@adiwajshing/baileys'
let impuesto = 0.02
let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'β³οΈ Menciona al usuario con @user'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw 'β³οΈ Ingrese la cantidad de *XP* que quiere transferir'
  if (isNaN(txt)) throw ' π’ sΓ³lo nΓΊmeros'
  let xp = parseInt(txt)
  let exp = xp
  let imt = Math.ceil(xp * impuesto)
  exp += imt
  if (exp < 1) throw 'β³οΈ MΓ­nimo es  *1*'
  let users = db.data.users
  if (exp > users[m.sender].exp) throw 'β³οΈ *Exp* insuficiente para transferir'
  users[m.sender].exp -= exp
  users[who].exp += xp

  await m.reply(`β‘ *TRANSFERENCIA De XP*
βββββββββββββββ
β’  *${-xp}* XP
β’ Impuesto 2% : *${-imt}* XP 
β’ Total gastado: *${-exp} XP*
βββββββββββββββ`)
  conn.fakeReply(m.chat, `β’ Recibiste \n\n *+${xp} XP*`, who, m.text)
}
handler.help = ['payxp @user <monto>']
handler.tags = ['xp']
handler.command = ['payxp', 'transferxp', 'darxp'] 
handler.rowner = false

export default handler


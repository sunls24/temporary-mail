export default {
  async email(message, env, ctx) {
    await fetch(`https://mail.sunls.de/api/report?to=${message.to}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: await new Response(message.raw).arrayBuffer(),
    });
  }
}
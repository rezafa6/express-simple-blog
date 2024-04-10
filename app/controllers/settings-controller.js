class SettingsController {
  async index(req, res) {
    res.mainRenderer("settings");
  }
}

module.exports = SettingsController;

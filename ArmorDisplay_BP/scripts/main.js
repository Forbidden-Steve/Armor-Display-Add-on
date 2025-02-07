import * as mc from '@minecraft/server';
import * as ui from '@minecraft/server-ui';

const VERSION = '1.0.0';
const SOUND_TURN_PAGE = 'item.book.page_turn';
const SOUND_OPTIONS = { pitch: 1.0, volume: 5.0 };

const MENU_MAIN = new ui.ActionFormData();
const MENU_TUTORIAL = new ui.ActionFormData();
const MENU_HAT_DISPLAY = new ui.ActionFormData();
const MENU_ARMOR_DISPLAY = new ui.ActionFormData();
const MENU_CRAFTING = new ui.ActionFormData();
const MENU_CHANGELOG = new ui.ActionFormData();

guideBookListeners();
setupStaticMenus();

//most of the menus don't ever change contents so we set them up once at the very start
function setupStaticMenus() {
  //GUIDEBOOK MAIN
  MENU_MAIN.title('Hello!');
  MENU_MAIN.body({
    rawtext: [
      { text: 'Version: §a' + VERSION + '§f\n' },
      { translate: 'forbiddensteve.menu_about_body', with: ['\n'] },
    ],
  });
  MENU_MAIN.button('§9Join Our Discord!', 'textures/forbiddensteve/icons/discord_icon');
  MENU_MAIN.button('How stuff works', 'textures/forbiddensteve/icons/how_stuff_works_icon');
  MENU_MAIN.button('Change Log', 'textures/forbiddensteve/icons/book_icon');

  //GUIDEBOOK TUTORIAL
  MENU_TUTORIAL.title('Tutorial');
  MENU_TUTORIAL.body('');
  MENU_TUTORIAL.button('Hat Display', 'textures/forbiddensteve/icons/hat_display_icon');
  MENU_TUTORIAL.button('Armor Display', 'textures/forbiddensteve/icons/armor_display_icon');
  MENU_TUTORIAL.button('Crafting', 'textures/forbiddensteve/icons/crafting_icon');
  MENU_TUTORIAL.button('Return', 'textures/forbiddensteve/icons/return_icon');

  //GUIDEBOOK Hat Display
  MENU_HAT_DISPLAY.title('Hat Display');
  MENU_HAT_DISPLAY.body(
    'The §eHat Display§r is used for wearing Helmets, Skulls, and even Carved Pumpkins! \n§7(Is Dyeable!) \n\n§7Controls:§r \n- §cUse§f a §6Stick§r to rotate the Display, It is fixed to rotate 45-degree angle. \n\n- §cUse§f a §6Wooden Axe§r to unequip anything the Display is wearing. \n- §cSneak+Use§f the §6Wooden Axe§r to equip armor again. \n§r',
  );
  MENU_HAT_DISPLAY.button('Return', 'textures/forbiddensteve/icons/return_icon');

  //GUIDEBOOK Armor Display
  MENU_ARMOR_DISPLAY.title('Armor Display');
  MENU_ARMOR_DISPLAY.body(
    'The §eArmor Display§r is used for wearing Helmets, Chestplates (& Illager Banner), Leggings, Boots, and Tools! \n§7(Is Dyeable!) \n\n§7Controls:§r \n- §cUse§f a §6Stick§r to rotate the Display, It is fixed to rotate 45-degree angle. \n\n- §cUse§f a §6Wooden Axe§r to unequip anything the Display is wearing. \n- §cSneak+Use§f the §6Wooden Axe§r to equip armor again. \n\n- §cUse§f §6Shears§r to cause the Display to emote and Sneak+Use to undo. \n§r',
  );
  MENU_ARMOR_DISPLAY.button('Return', 'textures/forbiddensteve/icons/return_icon');

  //GUIDEBOOK Crafting
  MENU_CRAFTING.title('Crafting');
  MENU_CRAFTING.body({
    rawtext: [{ translate: 'forbiddensteve.menu_crafting_body', with: ['\n'] }],
  });
  MENU_CRAFTING.button('Return', 'textures/forbiddensteve/icons/return_icon');

  //GUIDEBOOK CHANGELOG
  MENU_CHANGELOG.title('Change Log');
  MENU_CHANGELOG.body({
    rawtext: [
      { text: 'Version: §a' + VERSION + '§f\n' },
      { translate: 'forbiddensteve.menu_about_changelog_p1', with: ['\n'] },
      { translate: 'forbiddensteve.menu_about_changelog_p2', with: ['\n'] },
    ],
  });
  MENU_CHANGELOG.button('Return', 'textures/forbiddensteve/icons/return_icon');
}

function menuMain(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_MAIN.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        joinDiscord(player);
        break;
      case 1:
        menuTutorial(player);
        break;
      case 2:
        menuChangeLog(player);
        break;
      default:
        break;
    }
  });
}

function menuTutorial(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_TUTORIAL.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        menuHatDisplay(player);
        break;
      case 1:
        menuArmorDisplay(player);
        break;
      case 2:
        menuCrafting(player);
        break;
      case 3:
        menuMain(player);
        break;
      default:
        break;
    }
  });
}

function menuHatDisplay(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_HAT_DISPLAY.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        menuTutorial(player);
        break;
      default:
        break;
    }
  });
}

function menuArmorDisplay(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_ARMOR_DISPLAY.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        menuTutorial(player);
        break;
      default:
        break;
    }
  });
}

function menuCrafting(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_CRAFTING.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        menuTutorial(player);
        break;
      default:
        break;
    }
  });
}

function joinDiscord(player) {
  player.runCommandAsync(
    '/tellraw @s {"rawtext":[{"text":"§7[DISCORD]§r Join our Discord: §9https://discord.gg/g8SbtDf6rp"}]}',
  );
}

function menuChangeLog(player) {
  player.playSound(SOUND_TURN_PAGE, SOUND_OPTIONS);
  MENU_CHANGELOG.show(player).then((result) => {
    if (result.canceled) return;

    let response = result.selection;
    switch (response) {
      case 0:
        menuMain(player);
        break;
      default:
        break;
    }
  });
}

function guideBookListeners() {
  //drop guidebook on player first spawn only
  mc.world.afterEvents.playerSpawn.subscribe((eventData) => {
    if (eventData.player.hasTag('fs_steves_book')) {
    } else {
      mc.world
        .getDimension(eventData.player.dimension.id)
        .spawnItem(
          new mc.ItemStack('forbiddensteve:steves_guidebook', 1),
          eventData.player.location,
        );
      eventData.player.addTag('fs_steves_book');
    }
  });

  //guidebook activation listener
  mc.world.afterEvents.itemUse.subscribe((eventData) => {
    let player = eventData.source;
    let itemUse = eventData.itemStack;
    if (itemUse === undefined) return;
    if (itemUse.typeId == 'forbiddensteve:steves_guidebook') menuMain(player);
  });
}

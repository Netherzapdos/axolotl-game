export default class MainMap
{
    map!: Phaser.Tilemaps.MapData; 

    constructor(scene: Phaser.Scene)
    {

        const map = scene.make.tilemap({ key: 'axoltopia_main' });
        const tileset = map.addTilesetImage('Terrain', 'tiles');

        // Add layers
        const water = map.createLayer('Water', tileset);
           water.setCollisionByProperty({ collision: true })
        map.createLayer('Water Shadows', tileset); 
        map.createLayer('Water Effects', tileset);
        const sand = map.createLayer('Sand', tileset);
            sand.setCollisionByProperty({ collision: true })
        const land = map.createLayer('Land', tileset);
            land.setCollisionByProperty({ collision: true })
        map.createLayer('Land Overlay', tileset); 
        map.createLayer('Land Shadows', tileset); 

        // Convert Tiled tiles into Matter tiles (to apply new physics)
        scene.matter.world.convertTilemapLayer(water);
        scene.matter.world.convertTilemapLayer(sand);
        scene.matter.world.convertTilemapLayer(land); 

    // Set bounds
        scene.cameras.main.setBounds(0, 0, 1600, 1600) // 992, 800
        scene.matter.world.setBounds(0, -5, 1600, 1610) // 1005, 810
    }
}
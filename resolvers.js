const fs = require("fs");
const { data } = require("./data/data");
const { path } = require("./data/path");
const {
    returnChildren,
    returnName,
    changeName,
    deleteItem,
    addItem,
    dragAndDrop,
} = require("./logic");

const Query = {
    getFiles: () => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        return data;
    },
    getChildren: (parent, { id }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        return returnChildren(data, id);
    },
    getPath: () => {
        const lastItem = JSON.parse(fs.readFileSync("./data/path.json"));
        return lastItem[lastItem.length - 1].id;
    },
    getName: (parent, { id }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        return returnName(data, id);
    },
};

const Mutation = {
    addPath: (parent, { id }) => {
        const path = JSON.parse(fs.readFileSync("./data/path.json"));
        path.push({ id });
        fs.writeFileSync("./data/path.json", JSON.stringify(path));
        return id;
    },
    backPath: (parent, { id }) => {
        const path = JSON.parse(fs.readFileSync("./data/path.json"));
        console.log(path);
        const newPath = path.slice(
            0,
            path.findIndex((item) => item.id === id) + 1
        );
        fs.writeFileSync("./data/path.json", JSON.stringify(newPath));
        console.log(newPath);
        return newPath[newPath.length - 1].id;
    },
    changeName: (parent, { id, newName }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        const changeData = changeName(data, id, newName);
        fs.writeFileSync("./data/data.json", JSON.stringify(changeData));
        return changeData;
    },
    deleteFile: (parent, { id }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        const deleteData = deleteItem(data, id);
        fs.writeFileSync("./data/data.json", JSON.stringify(deleteData));
        return deleteData;
    },
    addFile: (parent, { id, name }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        const addedItem = addItem(data, id, name);
        fs.writeFileSync("./data/data.json", JSON.stringify(addedItem));
        return addedItem;
    },
    dragFile: (parent, { id, idTo }) => {
        const data = JSON.parse(fs.readFileSync("./data/data.json"));
        const dragData = dragAndDrop(data, id, idTo);
        fs.writeFileSync("./data/data.json", JSON.stringify(dragData));
        return dragData;
    },
};

module.exports = { Query, Mutation };

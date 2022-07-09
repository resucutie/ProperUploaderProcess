import { Plugin } from "ittai/entities";
// import { Progress } from "ittai/components";
import * as patcher from "ittai/patcher"
import * as webpack from "ittai/webpack"

const Progress = webpack.find(m => m?.default?.displayName === "Progress")

export default class ProperUploaderProcess extends Plugin {
    start() {
        patcher.before("InfiniteUploaderLook", webpack.findByProps("AttachmentUpload"), "AttachmentUpload", ([props]) => {
            if (props.progress === 100) props.progress = Progress.INDETERMINATE
        })
    }

    stop() {
        patcher.unpatchAll()
    }
}
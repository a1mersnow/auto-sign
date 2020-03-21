// am Activity Manager 管理应用程序活动

// am start [options] intent
// -D 启用调试
// -W 等待启动完成
// --start-profiler file 启动分析器并将结果保存到file
// -P file 类似于--start-profiler，但当应用进入空闲状态时分析停止
// -R count 重复Activity启动count次，每次重复前，完成顶部Activity
// -S 启动Activity前强行停止目标应用
// --opengl-trace 启用OpenGL函数的追踪
// --user user_id 指定要作为哪个用户运行，如果未指定，则作为当前用户运行

// am startservice [options] intent
// 同上 start

// am force-stop package

// kill [options] package
// --user user_id

// am kill-all 终止所有后台进程

// am broadcast [options] intent
// -user user_id 未指定则发送到所有用户

// am display-size reset | widthxheight

// am display-density dpi

// am to-uri intent

// am to-intent-uri intent

/**
 * 对于采用 intent 参数的 am 命令，您可以使用以下选项指定 intent：
 * -a action
 * 指定 intent 操作，如“android.intent.action.VIEW”。此指定只能声明一次。
 * -d data_uri
 * 指定 intent 数据 URI，如“content://contacts/people/1”。此指定只能声明一次。
 * -t mime_type
 * 指定 intent MIME 类型，如“image/png”。此指定只能声明一次。
 * -c category
 * 指定 intent 类别，如“android.intent.category.APP_CONTACTS”。
 * -n component
 * 指定带有软件包名称前缀的组件名称以创建显式 intent，如“com.example.app/.ExampleActivity”。
 * -f flags
 * 将标志添加到 setFlags() 支持的 intent。
 * --esn extra_key
 * 添加一个 null extra。URI intent 不支持此选项。
 * -e|--es extra_key extra_string_value
 * 添加字符串数据作为键值对。
 * --ez extra_key extra_boolean_value
 * 添加布尔型数据作为键值对。
 * --ei extra_key extra_int_value
 * 添加整数型数据作为键值对。
 * --el extra_key extra_long_value
 * 添加长整型数据作为键值对。
 * --ef extra_key extra_float_value
 * 添加浮点型数据作为键值对。
 * --eu extra_key extra_uri_value
 * 添加 URI 数据作为键值对。
 * --ecn extra_key extra_component_name_value
 * 添加组件名称，将其作为 ComponentName 对象进行转换和传递。
 * --eia extra_key extra_int_value[,extra_int_value...]
 * 添加整数数组。
 * --ela extra_key extra_long_value[,extra_long_value...]
 * 添加长整型数组。
 * --efa extra_key extra_float_value[,extra_float_value...]
 * 添加浮点型数组。
 * --grant-read-uri-permission
 * 包含标志 FLAG_GRANT_READ_URI_PERMISSION。
 * --grant-write-uri-permission
 * 包含标志 FLAG_GRANT_WRITE_URI_PERMISSION。
 * --debug-log-resolution
 * 包含标志 FLAG_DEBUG_LOG_RESOLUTION。
 * --exclude-stopped-packages
 * 包含标志 FLAG_EXCLUDE_STOPPED_PACKAGES。
 * --include-stopped-packages
 * 包含标志 FLAG_INCLUDE_STOPPED_PACKAGES。
 * --activity-brought-to-front
 * 包含标志 FLAG_ACTIVITY_BROUGHT_TO_FRONT。
 * --activity-clear-top
 * 包含标志 FLAG_ACTIVITY_CLEAR_TOP。
 * --activity-clear-when-task-reset
 * 包含标志 FLAG_ACTIVITY_CLEAR_WHEN_TASK_RESET。
 * --activity-exclude-from-recents
 * 包含标志 FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS。
 * --activity-launched-from-history
 * 包含标志 FLAG_ACTIVITY_LAUNCHED_FROM_HISTORY。
 * --activity-multiple-task
 * 包含标志 FLAG_ACTIVITY_MULTIPLE_TASK。
 * --activity-no-animation
 * 包含标志 FLAG_ACTIVITY_NO_ANIMATION。
 * --activity-no-history
 * 包含标志 FLAG_ACTIVITY_NO_HISTORY。
 * --activity-no-user-action
 * 包含标志 FLAG_ACTIVITY_NO_USER_ACTION。
 * --activity-previous-is-top
 * 包含标志 FLAG_ACTIVITY_PREVIOUS_IS_TOP。
 * --activity-reorder-to-front
 * 包含标志 FLAG_ACTIVITY_REORDER_TO_FRONT。
 * --activity-reset-task-if-needed
 * 包含标志 FLAG_ACTIVITY_RESET_TASK_IF_NEEDED。
 * --activity-single-top
 * 包含标志 FLAG_ACTIVITY_SINGLE_TOP。
 * --activity-clear-task
 * 包含标志 FLAG_ACTIVITY_CLEAR_TASK。
 * --activity-task-on-home
 * 包含标志 FLAG_ACTIVITY_TASK_ON_HOME。
 * --receiver-registered-only
 * 包含标志 FLAG_RECEIVER_REGISTERED_ONLY。
 * --receiver-replace-pending
 * 包含标志 FLAG_RECEIVER_REPLACE_PENDING。
 * --selector
 * 需要使用 -d 和 -t 选项以设置 intent 数据和类型。
 */


// pm 卸载 冻结等

// pm list packages [options] filter 输出包名包含 filter 中的文本的软件包
// -f 查看它们的关联文件
// -d 进行过滤以仅显示已停用的软件包
// -e 进行过滤以仅显示已启用的软件包
// -s 进行过滤以仅显示系统软件包
// -3 进行过滤以仅显示第三方软件包
// -i 查看软件包的安装程序
// -u 也包括卸载的软件包
// --user user_id 要查询的用户空间

// pm list permission-groups 输出所有已知的权限组

// pm list permissions [options] group 输出所有已知权限或仅输出group的权限
// -g 按组加以组织
// -f 输出所有信息
// -s 简短摘要
// -d 仅列出危险权限
// -u 仅列出用户将看到的权限

// pm list instrumentation [options] 列出所有测试软件包
// -f 列出用于测试软件包的apk
// --target_package 列出仅用于此应用的测试软件包

// pm list features 输出系统的所有功能

// pm list libraries 输出当前设备支持的所有库

// pm list users 输出系统上的所有用户

// pm path package 输出给定的package的apk路径

// pm install [options] path 将软件包安装到系统
// -l 安装具有转发锁定功能的软件包
// -r 重新安装现有应用，保留其数据
// -t 允许安装测试apk
// -i installer_package_name 指定安装程序软件包名称
// -s 在共享的大容量存储（如sdcard）上安装软件包
// -f 在内部系统内存上安装软件包
// -d 允许版本代码降级
// -g 授予应用清单文件中列出的所有权限

// pm uninstall [options] package 从系统中卸载软件包
// -k 一处软件包后保留数据和缓存目录

// pm clear package 删除与软件包关联的所有数据

// pm enable package_or_component 启用给定软件包或组件（作为“package/class”写入）

// pm disable package_or_component 停用给定软件包或组件（作为“package/class”写入）

// pm disable-user [options] pacakge_or_component
// --user user_id

// pm grant pacakge_name permission

// pm revoke package_name permission

// pm set-install-location location 更改默认安装位置
// 0 自动 让系统决定
// 1 内部
// 2 外部

// pm get-install-location

// pm set-permission-enforced permission [true | false] 指定是否应强制执行给定的权限

// pm trim-caches desired_free_space 减少缓存文件以达到给定的可用空间

// pm create-user user_name 使用给定的user_name创建新用户，输出新用户的标识符

// pm remove-user user_id 移除给定用户，删除与该用户关联的所有数据

// pm get-max-users 输出设备支持的最大用户数

// screencap filename 屏幕截图

// ls filepath

/**
 * @param cmd
 * @param root
 */
declare function shell(cmd: string, root?: boolean): {
  code: number
  result: string
  error: string
}

declare class Shell {
  new(root?: boolean): Shell
  exec(md: string): void
  exit(): void
  exitAndWaitFor(): void
  setCallback(callback: ShellCallbacks): void
}

interface ShellCallbacks {
  onOutput: (output: string) => void
  onNewLine: (line: string) => void
}
